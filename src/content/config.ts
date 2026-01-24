// import { glob } from 'astro/loaders';
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

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	// loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});


export const collections = { docs, legal, blog }

export type Sidebar = Record<string, { text: string; link: string, description?: string }[]>;

export const sidebar: Sidebar = {
  'Introduction': [
    { text: 'Getting Started', link: 'docs' },
    { text: 'Add an AWS account', link: 'docs/aws' },
    { text: 'Connect with Github', link: 'docs/github' },
    { text: 'First project', link: 'docs/import-repository' },
  ],
  'Patterns': [
    { 
      text: 'Overview', 
      link: 'docs/patterns' 
    },
    { 
      text: 'Single Page Application', 
      link: 'docs/patterns/s3-cloudfront',
      description: "S3 + CloudFront" 
    },
    { 
      text: 'Serverless Function', 
      link: 'docs/patterns/lambda-apigateway',
      description: "Lambda + API Gateway" 
    },
    { 
      text: 'Web Service', 
      link: 'docs/patterns/fargate-alb',
      description: "Fargate + ALB" 
    }
  ],
  'Frameworks': [
    { text: 'Overview', link: 'docs/frameworks' },
    { text: 'Astro', link: 'docs/frameworks/astro' },
    { text: 'Analog', link: 'docs/frameworks/analog' },
    // { text: 'Adonis JS', link: 'docs/frameworks/adonis' },
    // { text: 'Elysia JS', link: 'docs/frameworks/elysia' },
    { text: 'Hono', link: 'docs/frameworks/hono' },
    { text: 'Next.js', link: 'docs/frameworks/nextjs' },
    { text: 'Nuxt', link: 'docs/frameworks/nuxt' },
    { text: 'Nest JS', link: 'docs/frameworks/nestjs' },
    { text: 'React Router', link: 'docs/frameworks/react-router' },
    { text: 'Solid Start', link: 'docs/frameworks/solidjs' },
    { text: 'SvelteKit', link: 'docs/frameworks/sveltekit' },
    { text: 'TanStack Start', link: 'docs/frameworks/tanstack' },
    { text: 'Vite SPA', link: 'docs/frameworks/vite' },
    { text: 'Vitepress', link: 'docs/frameworks/vitepress' },
  ],
  'Thunder Console': [
    { text: 'Overview', link: 'docs/console' },
    { text: 'Managing Workspaces and Teams', link: 'docs/console/workspaces' },
    { text: 'Subscriptions and Billing', link: 'docs/console/billing' },
    { text: 'Build configuration', link: 'docs/console/build-config' },
    { text: 'Environment variables and Secrets', link: 'docs/console/environment-variables' },
    { text: 'Custom domains', link: 'docs/console/domains' },
    { text: 'Redirects and rewrites', link: 'docs/console/redirects-rewrites' },
    { text: 'Response Headers', link: 'docs/console/response-headers' },
    { text: 'Viewing Logs', link: 'docs/console/logs' },
    { text: 'Monitoring and Alerts', link: 'docs/console/monitoring' },
  ],
  'Community and Support': [
    { text: 'FAQ', link: 'docs/faq' },
    { text: 'Contact Support', link: 'docs/support' },
  ],
}