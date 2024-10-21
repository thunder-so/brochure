<script setup lang="ts">
import { type Ref, inject } from 'vue'
import type { DefaultTheme } from 'vitepress/theme'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'

export interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
}

defineProps<{
  name?: string
  text?: string
  tagline?: string
  image?: DefaultTheme.ThemeableImage
  actions?: HeroAction[]
}>()

const heroImageSlotExists = inject('hero-image-slot-exists') as Ref<boolean>
</script>

<template>
  <div class="VPHero" :class="{ 'has-image': image || heroImageSlotExists }">
    <div class="container">
      <div class="focus">
        <slot name="home-hero-info">
          <h1 v-if="name" class="name">
            <span class="clip">{{ name }}</span>
            <span v-if="text" class="text">{{ text }}</span>
          </h1>
          <p v-if="tagline" class="tagline">{{ tagline }}</p>
        </slot>

        <div v-if="actions" class="actions">
          <div v-for="action in actions" :key="action.link" class="action">
            <VPButton
              tag="a"
              size="medium"
              :theme="action.theme"
              :text="action.text"
              :href="action.link"
            />
          </div>
        </div>
      </div>

      <!-- <div v-if="image || heroImageSlotExists" class="image">
        <div class="image-container">
          <div class="image-bg" />
          <slot name="home-hero-image">
            <VPImage v-if="image" class="image-src" :image="image" />
          </slot>
        </div>
      </div> -->

    </div>
  </div>
</template>

<style scoped>
.VPHero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 164px) 24px 164px;
}

/* @media (min-width: 640px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}

@media (min-width: 960px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
  }
} */

.name {
  letter-spacing: -0.4px;
  font-size: 24px;
  line-height: 36px;
  font-weight: 700;
  white-space: pre-wrap;
  text-align: center;
}

.clip {
  display: block;
  color: #FFF;
}

@media (min-width: 640px) {
  .name {
    font-size: 28px;
    line-height: 42px;
  }
}

@media (min-width: 960px) {
  .name {
    font-size: 32px;
    line-height: 48px;
  }
}

.tagline {
  padding-top: 8px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
  text-align: center;
}

@media (min-width: 640px) {
  .tagline {
    font-size: 20px;
    line-height: 32px;
  }
}

@media (min-width: 960px) {
  .tagline {
    font-size: 20px;
    line-height: 32px;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-top: 24px;

}

.action {
  display: inline-block;
}


</style>