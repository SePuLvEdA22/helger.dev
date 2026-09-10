import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Sitio 100% estático, sin SSR ni adaptador. Deployable en Vercel/Netlify sin config extra.
// `site` debe coincidir con site.url en src/data/site.ts (pendiente dominio final).
export default defineConfig({
  output: 'static',
  site: 'https://helger.dev',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
