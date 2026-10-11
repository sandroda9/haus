import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const site = env.PUBLIC_SITE_URL?.trim() || undefined;

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: site ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
  server: { host: true },
});
