import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Sitio 100% estático, sin SSR ni adaptador. Deployable en Vercel/Netlify sin config extra.
export default defineConfig({
  output: 'static',
  integrations: [],
  vite: {
    plugins: [tailwindcss()]
  }
});
