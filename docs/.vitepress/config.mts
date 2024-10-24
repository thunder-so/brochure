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
  description: 'Thunder is the deployment platform for web developers on AWS.',
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
      'script',
      {},
      `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('phc_iZdxrs1Q9KveRfWKSqXQwABZDGbCAFbGw3WC1qz9BAT',{api_host:'https://us.i.posthog.com', person_profiles: 'always'
      })`
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
      message: 'Platform for Front-end Engineers on AWS.',
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
        { text: 'Vite', link: '/docs/start/vite' },
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
