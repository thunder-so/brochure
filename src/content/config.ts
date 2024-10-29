import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.literal('en-us').default('en-us'),
    dir: z.union([z.literal('ltr'), z.literal('rtl')]).default('ltr'),
    image: z
      .object({
        src: z.string(),
        alt: z.string()
      })
      .optional(),
    ogLocale: z.string().optional()
  })
});

const legal = defineCollection({
  schema: z.object({
    title: z.string()
  })
});

export const collections = { docs, legal }

export type Sidebar = Record<string, { text: string; link: string }[]>;

export const sidebar: Sidebar = {
  '': [
    { text: 'Introduction', link: 'docs/introduction' },
    { text: 'Concepts', link: 'docs/concepts' }
  ],
  'Getting Started': [
    { text: 'Create React App', link: 'docs/start/react' },
    { text: 'Next.js Static', link: 'docs/start/next-static' },
    { text: 'Vue.js', link: 'docs/start/vue' },
    { text: 'Svelte', link: 'docs/start/svelte' },
    { text: 'Astro', link: 'docs/start/astro' },
    { text: 'Gatsby', link: 'docs/start/gatsby' },
    { text: 'Vite', link: 'docs/start/vite' },
    { text: 'Vitepress', link: 'docs/start/vitepress' },
  ],
  'Stacks': [
    { text: 'Single Page Applications (SPA)', link: 'docs/single-page-application' },
  ],
  'How To': [
    { text: 'Add an AWS Account', link: 'docs/aws' },
    { text: 'Connect with Github', link: 'docs/github' },
    { text: 'Install an Application', link: 'docs/application' },
    { text: 'Deploy code', link: 'docs/deployments' },
    { text: 'Rollback', link: 'docs/rollback' },
    { text: 'Custom Domains', link: 'docs/domains' },
    { text: 'Monorepo Support', link: 'docs/monorepo' },
    { text: 'Environment Variables', link: 'docs/environment' },
  ],
  // 'Architecture': [
  //   { text: 'Modern Three Tier Pattern', link: 'docs/three-tier-pattern' },
  //   { text: 'Backend for Frontend Pattern', link: 'docs/backend-for-frontend' },
  // ],
}