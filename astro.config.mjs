// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
// import awsAmplify from 'astro-amplify';
import vercelServerless from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://thunder.so',
  output: 'server',
  // adapter: awsAmplify(),
  adapter: vercelServerless(),
  env: {
    schema: {
      SUPABASE_URL: envField.string({
        context: "server",
        access: "public",
        optional: false
      }),
      SUPABASE_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false
      }),
    }
  },
  integrations: [
    tailwind(), 
    sitemap(), 
    astroExpressiveCode({
      themes: ['material-theme-ocean', 'github-dark-default'],
      styleOverrides: {
        borderRadius: '0rem'
      },
    }), 
    mdx()
  ],
  redirects: {
    "/pricing": "/",
    // "/docs/frameworks/astro": "/docs/deploy/astro",
    // "/docs/start/astro": "/docs/deploy/astro",
    "/docs/frameworks/nextjs-spa": "/docs/frameworks/nextjs-static",
    // "/docs/start/nextjs-static": "/docs/frameworks/nextjs-static",
    // "/docs/frameworks/vite-preact": "/docs/deploy/vite-preact",
    // "/docs/frameworks/vite-react": "/docs/deploy/vite-react",
    // "/docs/frameworks/vite-svelte": "/docs/deploy/vite-svelte",
    // "/docs/frameworks/vite-vue": "/docs/deploy/vite-vue",
    // "/docs/frameworks/vitepress": "/docs/deploy/vitepress",
  }
});