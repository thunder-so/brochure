import { fileURLToPath, URL } from 'node:url'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'Thunder',
  description: 'Thunder is the lightning-fast deployment platform designed specifically for developers and web application teams.',
  markdown: {
    headers: {
      level: [0, 0],
    },
  },
  themeConfig: {
    footer: {
      message: 'AWS Simplified for Front-end Engineers.',
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
    editLink: {
      pattern: 'https://github.com/sfxcode/vitepress-blog-starter/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
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
    {
      text: 'Features',
      collapsible: true,
      items: [
        { text: 'UnoCSS', link: '/guide/features/unocss' },
      ],
    },
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
