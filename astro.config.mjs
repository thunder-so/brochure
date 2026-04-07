// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
import astroExpressiveCode from 'astro-expressive-code';
// import awsAmplify from 'astro-aws-amplify';
// import node from "@astrojs/node";
// import vercelServerless from '@astrojs/vercel';
// @ts-ignore - no type declarations available
import astroAws from "@astro-aws/adapter"

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.thunder.so',
  trailingSlash: 'never',
  output: 'server',
  // adapter: node({
  //   mode: "standalone"
  // }),
  // adapter: vercelServerless(),
  adapter: astroAws({
    mode: "ssr",
  }),

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
      themes: ['aurora-x'],
      styleOverrides: {
        borderRadius: '0rem',
        codeBackground: 'hsl(240, 10%, 4%)',
        frames: {
          frameBoxShadowCssValue: 'none',
          editorTabBarBackground: 'hsl(240, 10%, 6%)',
          terminalTitlebarBackground: 'hsl(240, 10%, 6%)',
        },
      },
    }), 
    mdx(),
    icon({
      include: {
        tabler: [
          "file",
          "lambda",
          "server",
          "brand-aws",
          "brand-github",
          "settings",
          "cloud-bolt",
          "arrow-narrow-right",
          "users",
          "plus",
          "minus",
          "brand-nextjs",
          "brand-x",
          "brand-discord",
          "brand-typescript"
        ],
        logos: [
          "aws-s3",
          "aws-codepipeline",
          "aws-codebuild",
          "aws-cloudfront",
          "aws-route53",
          "aws-eventbridge",
          "aws-api-gateway",
          "aws-lambda",
          "aws-fargate",
          "aws-amplify",
          "sst-icon",
          "claude-icon",
          "bun"
        ],
        "vscode-icons": [
          "file-type-nuxt",
          "file-type-astro",
          "file-type-vite",
          "file-type-nestjs",
          "file-type-reactjs",
          "file-type-typescript-official"
        ],
        
      }
    })
  ],

  redirects: {
    "/docs/frameworks/nextjs-spa": "/docs/frameworks/nextjs",
    "/docs/frameworks/nextjs-static": "/docs/frameworks/nextjs",
    "/docs/patterns/s3-cloudfront": "/docs/patterns/static",
    "/docs/patterns/lambda-apigateway": "/docs/patterns/lambda",
    "/docs/patterns/fargate-alb": "/docs/patterns/fargate",
    "/docs/frameworks/vite-react": "/docs/frameworks/vite",
    "/docs/frameworks/vite-preact": "/docs/frameworks/vite",
    "/docs/frameworks/vite-vue": "/docs/frameworks/vite",
    "/docs/frameworks/vite-svelte": "/docs/frameworks/vite",
  },

  vite: {
    plugins: [tailwindcss()]
  }
});