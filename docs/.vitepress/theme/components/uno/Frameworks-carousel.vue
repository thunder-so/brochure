<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

// export default {
//   name: 'App',
//   components: {
//     Carousel,
//     Slide,
//     Pagination,
//     Navigation,
//   },
// }

const settings = {
    itemsToShow: 3,
    wrapAround: true
}

const breakpoints = {
    // 700px and up
    768: {
        itemsToShow: 5,
        snapAlign: 'center',
    },
    // 1024 and up
    1024: {
        itemsToShow: 7,
        snapAlign: 'start',
    }
}

const slides = [
  { id: 1, title: 'Vue 3', content: 'Deploy VueJS on AWS' , src: 'Vue.svg'},
  { id: 2, title: 'React JS', content: 'Deploy React SSG on AWS' , src: 'React.svg'},
  { id: 3, title: 'Svelte', content: 'Deploy Svelte on AWS' , src: 'Svelte.svg'},
  { id: 4, title: 'Vite JS', content: 'Deploy Vite on AWS' , src: 'Vite.svg'},
  { id: 5, title: 'NextJS', content: 'Deploy NextJS on AWS' , src: 'Nextjs.svg'},
  { id: 6, title: 'Nuxt 3', content: 'Deploy Nuxt on AWS' , src: 'Nuxt.svg'},
  { id: 7, title: 'Remix JS', content: 'Deploy Remix Run on AWS' , src: 'RemixJS.svg'},
  { id: 8, title: 'Astro JS', content: 'Deploy Astro Build on AWS' , src: 'Astro.svg'},
  { id: 9, title: 'NestJS', content: 'Deploy NestJS on AWS' , src: 'NestJS.svg'},
  { id: 10, title: 'SolidJS', content: 'Deploy SolidJS on AWS' , src: 'SolidJS.svg'},
  { id: 11, title: 'Eleventy (11ty)', content: 'Deploy 11ty SSG on AWS' , src: '11ty.svg'},
  { id: 12, title: 'Adonis JS', content: 'Deploy AdonisJS on AWS' , src: 'AdonisJS.svg'},
  { id: 13, title: 'Hono JS', content: 'Deploy Hono JS on AWS' , src: 'HonoJS.svg'},
]
</script>

<template>
    <section class="segment">
        <div class="container">
            <div class="focus">
                <section class="intro text-center mb-10">
                <h2>
                    <span class="text-4xl font-light block mb-2">Works with the tools you love</span>
                </h2>
                <p>Import your existing projects from Github, or start fresh from a template.</p>
                </section>
            </div>
        </div>
        
        <Carousel v-bind="settings" :breakpoints="breakpoints" :autoplay="4000">
            <Slide v-for="slide in slides" :key="slide.id">
                <div class="carousel__item">
                    <div class="sr-only">
                        <h4>{{ slide.title }}</h4>
                        <p>{{ slide.content }}</p>
                    </div>
                    <img :src="`/images/frameworks/${slide.src}`" />
                </div>
            </Slide>
        </Carousel>
    </section>
</template>

<style scoped>
.carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s;
    padding: 24px;
}

.carousel__item img {
    width: 92px;
    max-height: 92px;
}
</style>