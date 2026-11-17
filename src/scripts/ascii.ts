// ── Motor de animaciones ASCII ───────────────────────────────────────────────
// Cada animación devuelve dos capas del mismo tamaño: `base` (tinta) y `hot`
// (acento naranja) que se superponen en dos <pre>. Solo se animan las visibles;
// con prefers-reduced-motion se pinta un único fotograma estático.

type Frame = { base: string; hot: string };
// still: instante del fotograma estático; offset: desde dónde arranca la animación
type Anim = { fps: number; still: number; offset?: number; frame: (t: number) => Frame };

// Proporción de una celda de texto: JetBrains Mono avanza 0.6em; line-height 1.15em.
const CW = 0.6;
const CH = 1.15;

class Grid {
  cols: number;
  rows: number;
  base: string[];
  hot: string[];
  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.base = new Array(cols * rows).fill(' ');
    this.hot = new Array(cols * rows).fill(' ');
  }
  set(r: number, c: number, ch: string, hot = false) {
    if (r < 0 || c < 0 || r >= this.rows || c >= this.cols) return;
    const i = r * this.cols + c;
    if (hot) { this.hot[i] = ch; this.base[i] = ' '; }
    else { this.base[i] = ch; this.hot[i] = ' '; }
  }
  text(r: number, c: number, s: string, hot = false) {
    [...s].forEach((ch, k) => this.set(r, c + k, ch, hot));
  }
  out(): Frame {
    const join = (a: string[]) => {
      let s = '';
      for (let r = 0; r < this.rows; r++) s += a.slice(r * this.cols, (r + 1) * this.cols).join('') + '\n';
      return s;
    };
    return { base: join(this.base), hot: join(this.hot) };
  }
}

// ── 1. Stack: tres capas (UI / API / DATOS) rotando, render por raycasting ────
function stack(cols = 70, rows = 34): Anim {
  const RAMP = '.,-~:;=!*#$@';
  const slabs = [
    { y: 1, hot: false },
    { y: 0, hot: true },
    { y: -1, hot: false },
  ];
  const HX = 1.05, HY = 0.13, HZ = 0.72;
  const FLOOR = -1.55;

  return {
    fps: 30,
    still: 2.2,
    frame(t) {
      const g = new Grid(cols, rows);
      const yaw = t * 0.45;
      const tilt = 0.4;
      const gap = 0.72 + Math.sin(t * 0.9) * 0.12;
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      // Vista → objeto: deshacer inclinación (X) y luego giro (Y)
      const toObj = (x: number, y: number, z: number): [number, number, number] => {
        const y1 = y * ct - z * st, z1 = y * st + z * ct;
        return [x * cy - z1 * sy, y1, x * sy + z1 * cy];
      };
      const L = toObj(-0.55, 0.75, -0.55);
      const ll = Math.hypot(...L); L[0] /= ll; L[1] /= ll; L[2] /= ll;
      const O = toObj(0, 0, -5.2);
      const scale = 1 / ((cols * CW) / 2);

      const hitBox = (o: number[], d: number[], cyb: number) => {
        let tn = -Infinity, tf = Infinity, axis = 0, sign = 0;
        const lo = [-HX, cyb - HY, -HZ], hi = [HX, cyb + HY, HZ];
        for (let a = 0; a < 3; a++) {
          if (Math.abs(d[a]) < 1e-9) { if (o[a] < lo[a] || o[a] > hi[a]) return null; continue; }
          let t1 = (lo[a] - o[a]) / d[a], t2 = (hi[a] - o[a]) / d[a];
          let s = -1;
          if (t1 > t2) { [t1, t2] = [t2, t1]; s = 1; }
          if (t1 > tn) { tn = t1; axis = a; sign = s; }
          if (t2 < tf) tf = t2;
          if (tn > tf || tf < 0) return null;
        }
        return tn > 0 ? { t: tn, axis, sign } : null;
      };

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5 - cols / 2) * CW * scale * 0.33;
          const y = (rows / 2 - r - 0.5) * CH * scale * 0.33 - 0.08;
          const d = toObj(x, y, 1);
          const dl = Math.hypot(...d); d[0] /= dl; d[1] /= dl; d[2] /= dl;

          let best: { t: number; axis: number; sign: number } | null = null, bi = -1;
          slabs.forEach((s, i) => {
            const h = hitBox(O, d, s.y * gap);
            if (h && (!best || h.t < best.t)) { best = h; bi = i; }
          });

          if (best) {
            const b = best as { t: number; axis: number; sign: number };
            const n = [0, 0, 0]; n[b.axis] = b.sign;
            const p = [O[0] + d[0] * b.t, O[1] + d[1] * b.t, O[2] + d[2] * b.t];
            const py = p[1] - slabs[bi].y * gap;
            // Aristas: dos coordenadas cerca del límite → línea de dibujo
            const ex = HX - Math.abs(p[0]) < 0.05, ey = HY - Math.abs(py) < 0.035, ez = HZ - Math.abs(p[2]) < 0.05;
            const edge = (ex ? 1 : 0) + (ey ? 1 : 0) + (ez ? 1 : 0) >= 2;
            const lum = Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
            const k = edge ? RAMP.length - 1 : Math.min(RAMP.length - 2, Math.floor((0.12 + lum * 0.88) * (RAMP.length - 1)));
            g.set(r, c, RAMP[k], slabs[bi].hot);
            continue;
          }

          // Suelo: retícula de planta + sombra proyectada
          if (d[1] < 0) {
            const tf = (FLOOR - O[1]) / d[1];
            const px = O[0] + d[0] * tf, pz = O[2] + d[2] * tf;
            const pf = [px, FLOOR + 0.001, pz];
            if (Math.hypot(px, pz) < 2.4 && slabs.some((s) => hitBox(pf, [0, 1, 0], s.y * gap))) g.set(r, c, '.');
          }
        }
      }
      return g.out();
    },
  };
}

// ── 2. Diagrama: cajas, conexiones y paquetes que viajan ─────────────────────
type Node = { id: string; r: number; c: number; w: number; label: string };
type Edge = { pts: [number, number][]; label?: [number, number, string]; both?: boolean; n?: number };

function diagram(cols: number, rows: number, nodes: Node[], edges: Edge[], speed = 0.32): Anim {
  // Expande los puntos de paso (segmentos ortogonales) en una lista de celdas
  const paths = edges.map((e) => {
    const cells: [number, number][] = [];
    for (let i = 0; i < e.pts.length - 1; i++) {
      const [r1, c1] = e.pts[i], [r2, c2] = e.pts[i + 1];
      const n = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
      for (let k = i === 0 ? 0 : 1; k <= n; k++) {
        cells.push([r1 + Math.sign(r2 - r1) * k, c1 + Math.sign(c2 - c1) * k]);
      }
    }
    return cells;
  });

  const drawStatic = (g: Grid) => {
    for (const nd of nodes) {
      g.text(nd.r, nd.c, '┌' + '─'.repeat(nd.w - 2) + '┐');
      const pad = nd.w - 2 - nd.label.length;
      g.text(nd.r + 1, nd.c, '│' + ' '.repeat(Math.floor(pad / 2)) + nd.label + ' '.repeat(Math.ceil(pad / 2)) + '│');
      g.text(nd.r + 2, nd.c, '└' + '─'.repeat(nd.w - 2) + '┘');
    }
    paths.forEach((cells, ei) => {
      cells.forEach(([r, c], k) => {
        const prev = cells[k - 1], next = cells[k + 1];
        const a = prev ?? next, b = next ?? prev;
        const horiz = a[0] === r && b[0] === r;
        const vert = a[1] === c && b[1] === c;
        let ch = horiz ? '─' : vert ? '│' : '┼';
        if (!horiz && !vert && prev && next) {
          const up = prev[0] < r || next[0] < r, down = prev[0] > r || next[0] > r;
          const left = prev[1] < c || next[1] < c, right = prev[1] > c || next[1] > c;
          ch = down && right ? '┌' : down && left ? '┐' : up && right ? '└' : up && left ? '┘' : '┼';
        }
        g.set(r, c, ch);
      });
      const lab = edges[ei].label;
      if (lab) g.text(lab[0], lab[1], lab[2]);
    });
  };

  return {
    fps: 20,
    still: 0.35,
    frame(t) {
      const g = new Grid(cols, rows);
      drawStatic(g);
      paths.forEach((cells, ei) => {
        const e = edges[ei];
        const count = e.n ?? 1;
        for (let k = 0; k < count; k++) {
          const dir = e.both && k % 2 ? -1 : 1;
          const p = (t * speed * (12 / cells.length) + k / count + ei * 0.37) % 1;
          const idx = Math.floor((dir > 0 ? p : 1 - p) * cells.length);
          const [r, c] = cells[Math.min(cells.length - 1, idx)];
          g.set(r, c, '■', true);
          // Al llegar, la caja destino se enciende
          if (p > 0.9) {
            const end = dir > 0 ? cells[cells.length - 1] : cells[0];
            const nd = nodes.find((n) => end[0] >= n.r - 1 && end[0] <= n.r + 3 && end[1] >= n.c - 1 && end[1] <= n.c + n.w);
            if (nd) g.text(nd.r + 1, nd.c + 1 + Math.floor((nd.w - 2 - nd.label.length) / 2), nd.label, true);
          }
        }
      });
      return g.out();
    },
  };
}

// Atajos para posicionar cajas en columnas fijas
const right = (n: Node): [number, number] => [n.r + 1, n.c + n.w];
const left = (n: Node): [number, number] => [n.r + 1, n.c - 1];
const bottom = (n: Node): [number, number] => [n.r + 3, n.c + Math.floor(n.w / 2)];
const top = (n: Node): [number, number] => [n.r - 1, n.c + Math.floor(n.w / 2)];

function systemPlan(): Anim {
  const W = 12, X = [0, 22, 44];
  const cli = { id: 'cli', r: 1, c: X[0], w: W, label: 'CLIENTE' };
  const api = { id: 'api', r: 1, c: X[1], w: W, label: 'API' };
  const cloud = { id: 'cloud', r: 1, c: X[2], w: W, label: 'NUBE' };
  const sen = { id: 'sen', r: 9, c: X[0], w: W, label: 'SENSOR' };
  const ard = { id: 'ard', r: 9, c: X[1], w: W, label: 'ARDUINO' };
  const app = { id: 'app', r: 9, c: X[2], w: W, label: 'ELECTRON' };
  return diagram(56, 12, [cli, api, cloud, sen, ard, app], [
    { pts: [right(cli), left(api)], label: [0, 14, 'HTTPS'], n: 2 },
    { pts: [right(api), left(cloud)], label: [0, 37, 'SQL'], both: true, n: 2 },
    { pts: [top(app), bottom(cloud)], label: [6, 52, 'SYNC'], both: true, n: 2 },
    { pts: [right(sen), left(ard)], label: [8, 14, 'GPIO'] },
    { pts: [right(ard), left(app)], label: [8, 35, 'SERIAL'], both: true, n: 2 },
  ]);
}

function gymPlan(): Anim {
  const W = 13, X = [0, 21, 42];
  const bio = { id: 'bio', r: 1, c: X[0], w: W, label: 'BIOMETRÍA' };
  const ard = { id: 'ard', r: 1, c: X[1], w: W, label: 'ARDUINO' };
  const app = { id: 'app', r: 1, c: X[2], w: W, label: 'ELECTRON' };
  const gate = { id: 'gate', r: 9, c: X[1], w: W, label: 'TORNIQUETE' };
  const db = { id: 'db', r: 9, c: X[2], w: W, label: 'SQLITE' };
  return diagram(55, 12, [bio, ard, app, gate, db], [
    { pts: [right(bio), left(ard)], label: [0, 14, 'HUELLA'] },
    { pts: [right(ard), left(app)], label: [0, 35, '9600'], both: true, n: 2 },
    { pts: [bottom(ard), top(gate)], label: [6, 29, 'PULSO'] },
    { pts: [bottom(app), top(db)], label: [6, 50, 'R/W'], both: true, n: 2 },
    { pts: [right(gate), left(db)], label: [8, 36, 'LOG'] },
  ], 0.26);
}

// ── 3. Radar: monitoreo en vivo ──────────────────────────────────────────────
function radar(cols = 41, rows = 21): Anim {
  const blips = [[0.55, 0.8], [0.8, 2.6], [0.35, 4.1], [0.7, 5.3]];
  return {
    fps: 24,
    still: 1.1,
    frame(t) {
      const g = new Grid(cols, rows);
      const R = (rows / 2 - 0.5) * CH;
      const sweep = (t * 1.2) % (Math.PI * 2);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dx = (c - (cols - 1) / 2) * CW, dy = ((rows - 1) / 2 - r) * CH;
          const d = Math.hypot(dx, dy);
          if (d > R + 0.4) continue;
          const th = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2);
          const lag = (sweep - th + Math.PI * 4) % (Math.PI * 2);
          if (Math.abs(d - R) < 0.32) g.set(r, c, '.');
          else if (Math.abs(d - R / 2) < 0.28) g.set(r, c, '·');
          else if (r === (rows - 1) / 2) g.set(r, c, '-');
          else if (c === (cols - 1) / 2) g.set(r, c, '¦');
          if (d < R - 0.2 && lag < 0.7) g.set(r, c, lag < 0.07 ? '#' : lag < 0.2 ? '+' : lag < 0.4 ? ':' : '.');
        }
      }
      for (const [rad, ang] of blips) {
        const lag = (sweep - ang + Math.PI * 4) % (Math.PI * 2);
        if (lag > 2.2) continue;
        const r = Math.round((rows - 1) / 2 - (Math.sin(ang) * rad * R) / CH);
        const c = Math.round((cols - 1) / 2 + (Math.cos(ang) * rad * R) / CW);
        g.set(r, c, lag < 0.6 ? '@' : lag < 1.4 ? 'o' : '.', true);
      }
      g.set((rows - 1) / 2, (cols - 1) / 2, '+', true);
      return g.out();
    },
  };
}

// ── 4. Teléfono con barras (finanzas personales) ─────────────────────────────
function phone(): Anim {
  const cols = 26, rows = 22;
  return {
    fps: 12,
    still: 0.8,
    frame(t) {
      const g = new Grid(cols, rows);
      g.text(0, 0, '╭' + '─'.repeat(cols - 2) + '╮');
      for (let r = 1; r < rows - 1; r++) { g.set(r, 0, '│'); g.set(r, cols - 1, '│'); }
      g.text(rows - 1, 0, '╰' + '─'.repeat(cols - 2) + '╯');
      g.text(1, 9, '(  ●  )');
      g.text(3, 3, 'GASTOS · NOV');
      const total = Math.round(1240 + Math.sin(t * 0.7) * 85);
      g.text(5, 3, '$ ' + total.toLocaleString('es-CO') + '.000', true);
      const base = 17, n = 6;
      let maxI = 0, maxH = 0;
      const hs = Array.from({ length: n }, (_, i) => {
        const h = Math.round(4 + 3.5 * (1 + Math.sin(t * 1.3 + i * 1.1)) / 2 + (i % 3));
        if (h > maxH) { maxH = h; maxI = i; }
        return h;
      });
      hs.forEach((h, i) => {
        for (let k = 0; k < h; k++) g.text(base - k, 3 + i * 3, '██', i === maxI);
      });
      g.text(base + 1, 2, '─'.repeat(cols - 4));
      g.text(base + 2, 3, 'L  M  M  J  V  S');
      g.text(rows - 2, 10, '──────');
      return g.out();
    },
  };
}

// ── 5. Terminal que escribe sola ─────────────────────────────────────────────
function terminal(): Anim {
  const lines = [
    '$ ping helger',
    '  respuesta en < 24h',
    '$ git checkout -b tu-proyecto',
    "  Switched to a new branch 'tu-proyecto'",
    '$ npm run ship',
    '  ✓ desplegado · código en tu repo',
  ];
  const cols = 46, rows = lines.length + 1;
  const total = lines.reduce((a, l) => a + l.length, 0);
  return {
    fps: 24,
    still: 999,
    offset: 0,
    frame(t) {
      const g = new Grid(cols, rows);
      let chars = t >= 999 ? total + 1 : Math.floor((t * 22) % (total + 70));
      let r = 0, cr = 0, cc = 0;
      for (const l of lines) {
        const shown = l.slice(0, Math.max(0, chars));
        if (shown.startsWith('$')) { g.set(r, 0, '$', true); g.text(r, 1, shown.slice(1)); }
        else g.text(r, 0, shown, shown.includes('✓'));
        if (chars > 0) { cr = r; cc = shown.length; }
        chars -= l.length;
        r++;
        if (chars <= 0) break;
      }
      if (chars > 0) { cr = lines.length; cc = 0; g.set(cr, 0, '$', true); cc = 2; }
      if (Math.floor(t * 2.4) % 2 === 0) g.set(cr, cc, '█', true);
      return g.out();
    },
  };
}

const registry: Record<string, () => Anim> = { stack, systemPlan, gymPlan, radar, phone, terminal };

// ── Montaje ──────────────────────────────────────────────────────────────────
type Live = { anim: Anim; base: HTMLElement; hot: HTMLElement; visible: boolean; last: number };

export function mountAscii() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const live: Live[] = [];

  document.querySelectorAll<HTMLElement>('[data-ascii]').forEach((el) => {
    const make = registry[el.dataset.ascii || ''];
    if (!make) return;
    const anim = make();
    const base = el.querySelector<HTMLElement>('.ascii-base');
    const hot = el.querySelector<HTMLElement>('.ascii-hot');
    if (!base || !hot) return;
    const f = anim.frame(anim.still);
    base.textContent = f.base;
    hot.textContent = f.hot;
    if (!reduce) live.push({ anim, base, hot, visible: false, last: -1 });
  });
  if (!live.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const l = live.find((x) => x.base.parentElement === e.target);
      if (l) l.visible = e.isIntersecting;
    }
  });
  live.forEach((l) => io.observe(l.base.parentElement!));

  const t0 = performance.now();
  const loop = (now: number) => {
    const t = (now - t0) / 1000;
    for (const l of live) {
      if (!l.visible || document.hidden) continue;
      if (now - l.last < 1000 / l.anim.fps) continue;
      l.last = now;
      const f = l.anim.frame(t + (l.anim.offset ?? l.anim.still));
      l.base.textContent = f.base;
      l.hot.textContent = f.hot;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

// ── Texto que se "decodifica" al entrar en pantalla ──────────────────────────
export function mountScramble() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const glyphs = '!<>-_\\/[]{}=+*^?#01';
  const run = (el: HTMLElement) => {
    const target = el.dataset.text || el.textContent || '';
    el.dataset.text = target;
    const start = performance.now();
    const dur = 500 + target.length * 18;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const fixed = Math.floor(p * target.length);
      el.textContent = [...target]
        .map((ch, i) => (i < fixed || ch === ' ' ? ch : glyphs[(Math.random() * glyphs.length) | 0]))
        .join('');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target as HTMLElement); io.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => io.observe(el));
}

// Fotograma estático para pintar en build (sin JS, sin salto de layout)
export function renderStill(name: string): Frame {
  const make = registry[name];
  if (!make) return { base: '', hot: '' };
  const a = make();
  return a.frame(a.still);
}
