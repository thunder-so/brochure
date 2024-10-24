<script setup lang="ts">
import { useData } from 'vitepress/dist/client/theme-default/composables/data.js'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar.js'
import Thunder from '../components/svg/thunder.vue'

const { theme } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <footer v-if="theme.footer" class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <div class="grid grid-cols-4">
        <div class="product">
          <h3>Product</h3>
          <ul>
            <!-- <li><a href="/features/">Features</a></li> -->
            <li><a href="/docs/">Documentation</a></li>
            <li><a href="/blog/">Developer Blog</a></li>
          </ul>
        </div>

        <div class="company">
          <h3>Company</h3>
          <ul>
            <li><a href="https://wellfound.com/company/cloudbits/jobs">Careers</a></li>
          </ul>
        </div>

        <div class="community">
          <h3>Community</h3>
          <ul>
            <li><a href="https://discord.gg/nZwr6c5c6v">
              Discord
            </a></li>
            <li><a href="https://github.com/thunder-so/">
              Github
            </a></li>
            <li><a href="https://twitter.com/_thunderso">
              Twitter / X
            </a></li>
          </ul>
        </div>

        <div class="footer-meta">
          <div class="flex space-between mb-1">
            <Thunder class="w-6 mr-2" />
            <h3>thunder</h3>
          </div>
          <p v-if="theme.footer.message" class="message mb-2" v-html="theme.footer.message"></p>
          <p>CloudBits, Inc.
            <br />651 N Broad St STE 206, 
            <br />Middletown, DE 19709
            <br /><a href="mailto:support@thunder.so">support@thunder.so</a>
          </p>
        </div>
      </div>  
      
      <div class="legal mt-2">
        <p>
          <span v-if="theme.footer.copyright" v-html="theme.footer.copyright"></span>
          <span><a href="/legal/privacy">Privacy Policy</a></span>
          <span><a href="/legal/terms">Terms &amp; Conditions</a></span>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  border-top: 1px solid var(--vp-c-bg-soft);
  background-color: var(--vp-sidebar-bg-color);
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.VPFooter.has-sidebar {
  display: none;
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 32px;
  }
}

h3 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

ul li {
  margin-bottom: 0.25rem;
}

span.icon {
  display: inline-block;
}

.legal {
  font-size: 13px;
  display: block;
  text-align: center;
}

.legal span {
  display: inline-block;
  margin-right: 0.5rem;
}
</style>
