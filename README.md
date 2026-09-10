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
- Animación fade-in al hacer scroll con `IntersectionObserver` (CSS + ~20 líneas de JS, sin librerías)
- Dark mode por defecto con toggle a light mode (persistido en `localStorage`)

## Estructura

```
portfolio/
├── astro.config.mjs        # output: 'static'
├── tailwind.config.mjs     # tokens del diseño (surface, primary, secondary…)
├── src/
│   ├── data/site.ts        # ★ PERSONALIZA AQUÍ: enlaces, email, proyectos, skills
│   ├── layouts/BaseLayout.astro
│   ├── components/         # Header, Hero, About, Projects, Skills, Contact, Footer, Icon
│   ├── pages/index.astro   # Hero + Sobre mí + Proyectos + Habilidades + Contacto
│   └── styles/global.css   # base, scrollbar, reveal-on-scroll, light mode
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
```

## Personalizar

1. **Contacto:** edita `src/data/site.ts` → `github`, `linkedin` (actualmente `#`), `email`.
2. **Proyectos:** edita el arreglo `projects` en el mismo archivo. El primero es **BodyFitGym**
   (`https://github.com/SePuLvEdA22/software_gym`); los otros 3 llevan `placeholder: true` como
   recordatorio — reemplázalos (ej. tu tienda online en Next.js) y quita el flag.
3. **Skills:** edita el arreglo `skills` si cambia tu stack.

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
