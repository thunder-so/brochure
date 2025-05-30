// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
// import awsAmplify from 'astro-aws-amplify';
// import node from "@astrojs/node";
import vercelServerless from '@astrojs/vercel';
// import astroAws from "@astro-aws/adapter"

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://thunder.so',
  trailingSlash: 'never',
  output: 'server',
  // adapter: node({
  //   mode: "standalone"
  // }),
  adapter: vercelServerless(),
  // adapter: astroAws({
  //   mode: "ssr",
  // }),

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
    "/docs/frameworks/nextjs-spa": "/docs/frameworks/nextjs-static",
  },

  vite: {
    plugins: [tailwindcss()]
  }
});