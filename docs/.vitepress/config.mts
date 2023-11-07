import { describe } from 'node:test'
import { fileURLToPath, URL } from 'node:url'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  base: '/',
  title: 'Thunder.so',
  description: 'Thunder is the lightning-fast deployment platform designed specifically for developers and web application teams.',
  // cleanUrls: true,
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
        href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap',
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
      copyright: 'Copyright © 2023 CloudBits, Inc.',
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
      '/guide/': sidebarGuide(),
      '/config/': sidebarConfig(),
    },
    blog: {
      title: 'The Cloud Blog',
      description: 'Educational content and resources on how web developers can leverage the cloud.',
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
    { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
    // { text: 'Configs', link: '/config/', activeMatch: '/config/' },
    { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
    { text: 'Pricing', link: '/pricing/', activeMatch: '/pricing/' },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/guide/' },
        { text: 'Applications', link: '/guide/applications' },
        { text: 'Deployments', link: '/guide/deploy' },
      ],
    },
    // {
    //   text: 'Features',
    //   collapsible: true,
    //   items: [
    //     { text: 'UnoCSS', link: '/guide/features/unocss' },
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
