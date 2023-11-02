<script setup lang="ts">
import type { Post } from '../../composables/posts.data'

const props = defineProps<{
  post: Post
}>()

const category: string = props.post.data.category ? props.post.data.category : 'Article'
</script>

<template>
  <div class="category">
    <span v-if="category === 'Article'" class="icon i-heroicons-outline-book-open" />
    <span v-if="category === 'Tutorial'" class="icon i-heroicons-outline-academic-cap" />
    <span v-if="category === 'Document'" class="icon i-heroicons-outline-document" />
    <span class="text">{{ category }}</span>
  </div>
</template>

<style scoped>
.category {
  display: flex;
}
span.icon {
  display: inline-block;
  line-height: 24px;
}
span.text {
  line-height: 20px;
  font-size: 14px;
  margin-left: 5px;
}
</style>
