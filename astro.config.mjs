// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
// import awsAmplify from 'astro-aws-amplify';
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
});