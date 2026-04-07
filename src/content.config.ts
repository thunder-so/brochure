import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
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
  loader: glob({ base: './src/content/legal', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string()
  })
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
  }),
});

export const collections = { docs, legal, blog }

export type Sidebar = Record<string, { text: string; link: string, description?: string, icon?: string, iconColor?: string }[]>;

export const sidebar: Sidebar = {
  'Introduction': [
    { text: 'Getting Started', link: 'docs' },
    { text: 'Claude Code', link: 'docs/claude-code' },
  ],
  'Patterns': [
    { text: 'Overview', link: 'docs/patterns' },
    { text: 'Static', link: 'docs/patterns/static', description: "S3 + CloudFront", icon: 'tabler:file', iconColor: 'text-blue-400' },
    { text: 'Lambda', link: 'docs/patterns/lambda', description: "Lambda + API Gateway", icon: 'tabler:lambda', iconColor: 'text-emerald-400' },
    { text: 'Fargate', link: 'docs/patterns/fargate', description: "Fargate + ALB", icon: 'tabler:server', iconColor: 'text-purple-400' },
    { text: 'Serverless Fullstack', link: 'docs/patterns/serverless', description: "Lambda + S3 + CloudFront", icon: 'tabler:cloud-bolt', iconColor: 'text-orange-400' }
  ],
  'Frameworks': [
    { text: 'Overview', link: 'docs/frameworks' },
    { text: 'Astro', link: 'docs/frameworks/astro' },
    { text: 'Analog', link: 'docs/frameworks/analog' },
    { text: 'Hono', link: 'docs/frameworks/hono' },
    { text: 'Next.js', link: 'docs/frameworks/nextjs' },
    { text: 'Nuxt', link: 'docs/frameworks/nuxt' },
    { text: 'Nest JS', link: 'docs/frameworks/nestjs' },
    { text: 'Solid Start', link: 'docs/frameworks/solidjs' },
    { text: 'SvelteKit', link: 'docs/frameworks/sveltekit' },
    { text: 'TanStack Start', link: 'docs/frameworks/tanstack' },
    { text: 'Vite SPA', link: 'docs/frameworks/vite' },
    { text: 'Vitepress', link: 'docs/frameworks/vitepress' },
  ],
  'Console Guides': [
    { text: 'Add an AWS account', link: 'docs/aws' },
    { text: 'Connect with Github', link: 'docs/github' },
    { text: 'Import repository', link: 'docs/import-repository' },
    { text: 'Build configuration', link: 'docs/console/build-config' },
    { text: 'Environment variables and Secrets', link: 'docs/console/environment-variables' },
    { text: 'Custom domains', link: 'docs/console/domains' },
    { text: 'Redirects and Rewrites', link: 'docs/console/redirects-rewrites' },
    { text: 'Response headers', link: 'docs/console/response-headers' },
  ],
  'Community and Support': [
    { text: 'FAQ', link: 'docs/faq' },
    { text: 'Contact Support', link: 'docs/support' },
  ],
}
