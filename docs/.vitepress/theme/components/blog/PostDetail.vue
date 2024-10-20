<script setup lang="ts">
import { useData } from 'vitepress'
import usePosts from '../../composables/usePosts'
import useAuthors from '../../composables/useAuthors'

const { site } = useData()

const { currentPost: post, path, prevPost, nextPost } = usePosts()
const { findByName } = useAuthors()
const author = findByName(post.value.author)
</script>

<template>
  <div>
    <article class="blog-post">
      <div class="flex justify-between items-center mb-1 text-gray-500">
        <!-- <PostAuthor :author="author" /> -->
        <span class="bg-primary-100  text-sm font-medium inline-flex items-center rounded">
          <PostIcon :post="post" />
        </span>
        
        <span class="text-sm">{{ post.date.since }}</span>
      </div>

      <h3 class="mt-2 text-4xl">
        <span>{{ post.title }}</span>
      </h3>
      <slot />
    </article>

    <footer class="VPDocFooter">
      <div class="prev-next">
        <div class="pager">
          <a class="pager-link prev" v-if="prevPost" :href="`${site.base}blog${prevPost.href}`">
            <span class="desc">Previous post</span>
            <span class="title">{{ prevPost.title }}</span>
          </a>
        </div>
        <div class="pager has-prev">
          <a class="pager-link next" v-if="nextPost" :href="`${site.base}blog${nextPost.href}`">
            <span class="desc">Next post</span>
            <span class="title">{{ nextPost.title }}</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>