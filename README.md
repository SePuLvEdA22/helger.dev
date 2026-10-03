# DevCore — Portafolio personal (Astro 100% estático)

Portafolio de **Helger Santiago** — Software Developer y estudiante de Ingeniería de Software
(Cúcuta, Colombia). Construido con **Astro + TypeScript + Tailwind CSS**, sin backend ni base de
datos. Diseño basado en `stitch_minimalist_developer_web_portfolio` (sistema "Obsidian Engineering":
dark mode por defecto, acentos esmeralda/cian/índigo, bento grid, terminal JSON).

## Stack

- [Astro](https://astro.build) (output `static`) + TypeScript
- Tailwind CSS v4 vía plugin oficial `@tailwindcss/vite` (tokens del diseño en `src/styles/global.css`
  con `@theme`; `@astrojs/tailwind` está deprecado y no soporta Astro 7)
- Sin frameworks de UI (cero React/Vue). Iconos SVG inline estilo Lucide, sin imágenes de stock
- Tipografías self-hosted con Fontsource variable: `Space Grotesk` (display), `Inter Tight` (body),
  `JetBrains Mono` (mono). Sin Google Fonts = sin trackers ni FOUT externo
- Animación con `motion` (vanilla JS): entrada del Hero con stagger, barra de progreso de scroll
  y reveal on scroll. Respeta `prefers-reduced-motion` y funciona sin JS (fallback `noscript`)
- Dark mode por defecto con toggle a light mode (persistido en `localStorage`)

## Estructura

```
portfolio/
├── astro.config.mjs        # output: 'static'
├── src/
│   ├── data/site.ts        # ★ PERSONALIZA AQUÍ: enlaces, email, proyectos, skills, servicios, proceso, FAQ
│   ├── utils/accent.ts     # tokens de acento compartidos (primary/secondary/tertiary)
│   ├── layouts/BaseLayout.astro
│   ├── components/         # Header, Hero, Services, About, Projects, Skills, Faq, Contact, Footer, Icon
│   ├── pages/index.astro   # Hero + Servicios + Proyectos + Sobre mí + Habilidades + FAQ + Contacto
│   └── styles/global.css   # tokens @theme, base, scrollbar, reveal-on-scroll, light mode
└── public/favicon.svg
```

## Instalación y desarrollo

Requisitos: Node.js 18+ y npm.

```bash
cd portfolio
npm install
npm run dev      # http://localhost:4321
```

Otros scripts:

```bash
npm run build    # genera ./dist (estático puro)
npm run preview  # sirve ./dist en local para verificar
npm run check    # chequeo de tipos Astro + TypeScript
```

## Personalizar

1. **Contacto:** edita `src/data/site.ts` → `github`, `linkedin` (actualmente `#`), `email`.
2. **Proyectos:** edita el arreglo `projects` en el mismo archivo. Actualmente hay 5 proyectos reales
   (BodyFitGym destacado + RH Eventos, Control Gastos, Serene Boutique y Portfolio XP).
   Cada uno define `icon` (nombre de `Icon`), `kickerColor` y `demoUrl` opcional.
3. **Skills:** edita el arreglo `skills` si cambia tu stack.
4. **Servicios / Proceso / FAQ:** edita `services`, `processSteps` y `faqs` en el mismo archivo.
   Los plazos y precios de las respuestas son orientativos — ajústalos a tu realidad.

## Deploy

El proyecto es estático puro (`dist/`), sin adaptador ni variables de entorno.

### Vercel (recomendado, cero config)

1. Sube el repo a GitHub.
2. En Vercel: **Add New → Project → Import** el repo.
3. Vercel detecta Astro automáticamente:
   - Framework Preset: `Astro`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy. Cada push a `main` redespliega solo.

O por CLI:

```bash
npm i -g vercel
vercel --prod
```

### Netlify

1. **Add new site → Import an existing project** desde GitHub.
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy. (Alternativa: arrastra la carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop).)

## Notas

- Las secciones usan `scroll-mt-24` para que el header fijo no tape los anclajes (`#inicio`,
  `#sobre-mi`, `#proyectos`, `#habilidades`, `#contacto`).
- Se respeta `prefers-reduced-motion` (desactiva el reveal y el scroll suave).
