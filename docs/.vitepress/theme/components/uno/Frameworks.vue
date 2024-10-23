<script setup lang="ts">
const frameworks = [
{ id: 2, title: 'React JS', content: 'Deploy React SSG on AWS', src: 'React.svg', link: '/docs/start/react.html' },
{ id: 1, title: 'Vue', content: 'Deploy VueJS on AWS', src: 'Vue.svg', link: '/docs/start/vue.html' },
{ id: 3, title: 'Svelte', content: 'Deploy Svelte on AWS', src: 'Svelte.svg', link: '/docs/start/svelte.html' },
{ id: 8, title: 'Astro', content: 'Deploy Astro Build on AWS', src: 'Astro.svg', link: '/docs/start/astro.html' },
{ id: 8, title: 'Gatsby', content: 'Deploy Gatsby on AWS', src: 'Gatsby.svg', link: '/docs/start/gatsby.html' },
{ id: 4, title: 'Vite', content: 'Deploy Vite on AWS', src: 'Vite.svg', link: '/docs/start/vite.html' },
{ id: 5, title: 'Next.js Static', content: 'Deploy NextJS on AWS' , src: 'Nextjs.svg', link: '/docs/start/next-static.html'},
]
</script>

<template>
<section class="segment frameworks">
    <div class="container">
        <div class="focus">
            <h3>Deploy your next project on AWS</h3>
            <p>Get setup in 2 minutes with seamless CI/CD with your Github repository.</p>
        </div>

        <div class="frameworks">
            <a :href="slide.link" class="framework" v-for="slide in frameworks" :key="slide.id">
                <div class="sr-only">
                    <h4>{{ slide.title }}</h4>
                    <p>{{ slide.content }}</p>
                </div>
                <img :src="`/images/frameworks/${slide.src}`" :alt="`Deploy ${slide.title} on AWS`" />
                <p>{{ slide.title }}</p>
            </a>
        </div>
    </div>
</section>
</template>

<style scoped>
.frameworks {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.frameworks .focus {
    text-align: center;
    margin-bottom: 2rem;
}

.frameworks h3 {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 400;
    margin-bottom: 0.75rem;
}

.framework {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s;
    padding: 24px;
    flex: 1;
}

.framework:hover {
    border-color: var(--vp-c-divider);
    text-decoration: none;
}


.framework img {
    max-width: 72px;
    height: 72px;
    display: block;
}

.framework p {
    display: block;
    margin-top: 0.75rem;
    font-size: 16px;
    font-weight: 400;
}

</style>