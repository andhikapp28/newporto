// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  site: 'https://andhikapp28.github.io',
  base: '/newporto',
  integrations: [
    sitemap(),
    {
      name: 'sitemap-xml-alias',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const distDir = fileURLToPath(dir);
          const sitemap0 = path.join(distDir, 'sitemap-0.xml');
          const sitemapXml = path.join(distDir, 'sitemap.xml');
          if (fs.existsSync(sitemap0)) {
            fs.copyFileSync(sitemap0, sitemapXml);
          }
        }
      }
    }
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 650,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) {
              return 'vendor-three';
            }
          }
        }
      }
    }
  }
});
