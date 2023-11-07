<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data.js'
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js'
import { useEditLink } from 'vitepress/dist/client/theme-default/composables/edit-link.js'
import { usePrevNext } from 'vitepress/dist/client/theme-default/composables/prev-next.js'
import VPIconEdit from 'vitepress/dist/client/theme-default/components/icons/VPIconEdit.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPDocFooterLastUpdated from 'vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue'

const { theme, page, frontmatter } = useData()

const editLink = useEditLink()
const control = usePrevNext()

const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false
})
const hasLastUpdated = computed(() => {
  return page.value.lastUpdated && frontmatter.value.lastUpdated !== false
})
const showFooter = computed(() => {
  return hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next
})
</script>

<template>
  <footer v-if="showFooter" class="VPDocFooter">
    <div v-if="hasEditLink || hasLastUpdated" class="edit-info">
      <div v-if="hasEditLink" class="edit-link">
        <VPLink class="edit-link-button" :href="editLink.url" :no-icon="true">
          <VPIconEdit class="edit-link-icon" />
          {{ editLink.text }}
        </VPLink>
      </div>

      <div v-if="hasLastUpdated" class="last-updated">
        <VPDocFooterLastUpdated />
      </div>
    </div>

    <div v-if="control.prev?.link || control.next?.link" class="prev-next">
      <div class="pager">
        <a v-if="control.prev?.link" class="pager-link prev" :href="normalizeLink(control.prev.link)">
          <span class="desc" v-html="theme.docFooter?.prev || 'Previous page'"></span>
          <span class="title" v-html="control.prev.text"></span>
        </a>
      </div>
      <div class="pager" :class="{ 'has-prev': control.prev?.link }">
        <a v-if="control.next?.link" class="pager-link next" :href="normalizeLink(control.next.link)">
          <span class="desc" v-html="theme.docFooter?.next || 'Next page'"></span>
          <span class="title" v-html="control.next.text"></span>
        </a>
      </div>
    </div>
  </footer>
</template>