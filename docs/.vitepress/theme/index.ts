import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import { h } from 'vue'
import 'uno.css'
import './overrides.css'
import './tailwind.postcss'
import Frameworks from './components/uno/Frameworks.vue'
import Posts from './components/blog/Posts.vue'
import Post from './components/blog/Post.vue'
import PostDetail from './components/blog/PostDetail.vue'
import PostIcon from './components/blog/PostIcon.vue'
import PostAuthor from './components/blog/PostAuthor.vue'
import AuthorDetail from './components/blog/AuthorDetail.vue'

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots

    })
  },
  enhanceApp({ app, router, siteData }: { app: App, router, siteData }) {
    app.component('Frameworks', Frameworks)
    app.component('Posts', Posts)
    app.component('Post', Post)
    app.component('PostDetail', PostDetail)
    app.component('PostIcon', PostIcon)
    app.component('PostAuthor', PostAuthor)
    app.component('AuthorDetail', AuthorDetail)
  },
}
