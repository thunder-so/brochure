// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [tailwind(), sitemap(), astroExpressiveCode({
    // You can set configuration options here
    themes: ['material-theme-ocean', 'github-dark-default'],
    styleOverrides: {
      // You can also override styles
      borderRadius: '0rem',
      // frames: {
      //   shadowColor: '#124',
      // },
    },
  }), mdx()],
  site: 'https://thunder.so'
});