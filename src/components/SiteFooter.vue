<template>
  <footer class="footer">
    <div class="measure">
      <p class="faint">Last updated {{ site.lastUpdated }}</p>
      <nav class="link-row">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          :target="l.href.startsWith('mailto:') ? undefined : '_blank'"
          rel="noopener"
          >{{ l.label }}</a
        >
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site, links } from '@/data/site'
</script>

<style scoped>
.footer {
  margin-top: var(--gap-section);
  padding-top: 1.5rem;
  border-top: 1px solid var(--rule);
}

.faint {
  font-size: 0.86rem;
  margin-bottom: 0.8rem;
}
</style>
