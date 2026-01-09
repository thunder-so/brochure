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

export type Sidebar = Record<string, { text: string; link: string }[]>;

export const sidebar: Sidebar = {
  'Introduction': [
    { text: 'Getting Started', link: 'docs' },
    { text: 'How it works', link: 'docs/concepts' },
    { text: 'Add an AWS account', link: 'docs/aws' },
    { text: 'Connect with Github', link: 'docs/github' },
    { text: 'Import a repository', link: 'docs/import-repository' },
  ],
  'Frameworks': [
    { text: 'Astro', link: 'docs/frameworks/astro' },
    { text: 'Next.js', link: 'docs/frameworks/nextjs-static' },
    // { text: 'Gatsby', link: 'docs/frameworks/gatsby' },
    { text: 'React.js', link: 'docs/frameworks/vite-react' },
    { text: 'React Router', link: 'docs/frameworks/react-router' },
    { text: 'Vue.js', link: 'docs/frameworks/vite-vue' },
    { text: 'Svelte.js', link: 'docs/frameworks/vite-svelte' },
    { text: 'Preact.js', link: 'docs/frameworks/vite-preact' },
    // { text: 'Lit.js', link: 'docs/frameworks/vite-lit' },
    // { text: 'Qwik.js', link: 'docs/frameworks/vite-qwik' },

    { text: 'Vite', link: 'docs/frameworks/vite' },
    { text: 'Vitepress', link: 'docs/frameworks/vitepress' },
  ],
  // 'Stacks': [
  //   { text: 'Single Page Applications (SPA)', link: 'docs/single-page-application' },
  // ],
  'How To': [
    { text: 'Build configuration', link: 'docs/build-config' },
    { text: 'Environment variables', link: 'docs/environment-variables' },
    { text: 'Custom domains', link: 'docs/domains' },
    { text: 'Redirects and rewrites', link: 'docs/redirects-rewrites' },
    { text: 'Response Headers', link: 'docs/response-headers' }
  ],
  // 'Architecture': [
  //   { text: 'Modern Three Tier Pattern', link: 'docs/three-tier-pattern' },
  //   { text: 'Backend for Frontend Pattern', link: 'docs/backend-for-frontend' },
  // ],
}