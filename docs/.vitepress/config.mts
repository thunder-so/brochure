import { createContentLoader, defineConfig, HeadConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import { resolve } from 'node:path'
import { describe } from 'node:test'
import { fileURLToPath, URL } from 'node:url'
import { createWriteStream } from 'node:fs'
import { SitemapStream } from 'sitemap'

export default defineConfig({
  lang: 'en-US',
  base: '/',
  title: 'Thunder.so',
  description: 'Thunder is the lightning-fast deployment platform designed specifically for developers and web application teams.',
  // cleanUrls: true,

  // Sitemap
  lastUpdated: true,
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'https://thunder.so/' })
    const pages = await createContentLoader('*.md').load()
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))

    sitemap.pipe(writeStream)
    pages.forEach((page) => sitemap.write(
      page.url
        // Strip `index.html` from URL
        .replace(/index.html$/g, '')
        // Optional: if Markdown files are located in a subfolder
        .replace(/^\/docs/, '')
      ))
    sitemap.end()

    await new Promise((r) => writeStream.on('finish', r))
  },

  // OpenGraph
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = []

    head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
    head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
    
    return head
  },

  // Analytics and Fonts
  head: [
    // [
    //   'script', {}, `
    //     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //     })(window,document,'script','dataLayer','GTM-WJGN6NJ');
    //   `,
    // ],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-WY75WH7XZ7',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-WY75WH7XZ7');`
    ],
    [
      "link", {
          rel: 'icon',
          href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" 
      },
    ],
    [
      "link", {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      }
    ],
    [
      "link", {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: ''
      }
    ],
    [
      "link", {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap',
      }
    ]
  ],
  markdown: {
    headers: {
      level: [0, 0],
    },
  },
  themeConfig: {
    logo: '/images/thunder.svg',
    siteTitle: 'thunder',
    footer: {
      message: 'AWS Deployment Platform for Front-end Engineers.',
      copyright: 'Copyright © 2024 CloudBits, Inc.',
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/thunder-so/' },
      { icon: 'discord', link: 'https://discord.gg/nZwr6c5c6v' },
      { icon: 'x', link: 'https://twitter.com/_thunderso' }
    ],
    // editLink: {
    //   pattern: 'https://github.com/thunder-so/brochure/docs/:path',
    //   text: 'Edit this page on GitHub',
    // },
    nav: nav(),
    sidebar: {
      '/docs/': sidebarDocs(),
      // '/config/': sidebarConfig(),
    },
    blog: {
      title: 'Developer Blog',
      description: 'Learn how to ship code quickly and reliably.',
    },
  },
  vite: {
    plugins: [
      Unocss({
        configFile: '../../unocss.config.ts',
      }),
    ],

    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPHome.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPHero.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPNavBar.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPButton\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPButton.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPHomeHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPHomeHero.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFeatures\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPFeatures.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFeature\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPFeature.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPFooter.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPDocFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPDocFooter.vue', import.meta.url)
          )
        },
      ]
    }
  },
})

function nav() {
  return [
    { text: 'Docs', link: '/docs/', activeMatch: '/docs/' },
    // { text: 'Configs', link: '/config/', activeMatch: '/config/' },
    { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
    { text: 'Pricing', link: '/pricing/', activeMatch: '/pricing/' },
  ]
}

function sidebarDocs() {
  return [
    {
      items: [
        { text: 'Introduction', link: '/docs/' },
        { text: 'Concepts', link: '/docs/concepts' },
      ],
    },
    {
      text: 'Get Started',
      collapsible: true,
      items: [
        { text: 'Create React App', link: '/docs/start/react' },
        { text: 'Next.js Static', link: '/docs/start/next-static' },
        { text: 'Vue.js', link: '/docs/start/vue' },
        { text: 'Svelte', link: '/docs/start/svelte' },
        { text: 'Astro', link: '/docs/start/astro' },
        { text: 'Gatsby', link: '/docs/start/gatsby' },
        { text: 'Vitepress', link: '/docs/start/vitepress' },
      ],
    },
    {
      text: 'Stacks',
      collapsible: true,
      items: [
        { text: 'Single Page Applications (SPA)', link: '/docs/single-page-application' },
      ],
    },
    {
      text: 'How To',
      collapsible: true,
      items: [
        { text: 'Add an AWS Account', link: '/docs/aws' },
        { text: 'Connect with Github', link: '/docs/github' },
        { text: 'Install an Application', link: '/docs/application' },
        { text: 'Deploy code', link: '/docs/deployments' },
        { text: 'Rollback', link: '/docs/rollback' },
        { text: 'Custom Domains', link: '/docs/domains' },
        { text: 'Monorepo Support', link: '/docs/monorepo' },
        { text: 'Environment Variables', link: '/docs/environment' },
      ],
    },
    
    // {
    //   text: 'Architecture',
    //   collapsible: true,
    //   items: [
    //     { text: 'Modern Three Tier Pattern', link: '/docs/three-tier-pattern' },
    //     { text: 'Backend for Frontend Pattern', link: '/docs/backend-for-frontend' },
    //   ],
    // },
  ]
}

function sidebarConfig() {
  return [
    {
      text: 'Config',
      items: [
        { text: 'Introduction', link: '/config/' },
        { text: 'UnoCSS', link: '/config/unocss' },
      ],
    },
  ]
}
