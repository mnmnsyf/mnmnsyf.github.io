<template>
  <footer class="footer">
    <div class="measure">
      <p class="faint">Last updated {{ site.lastUpdated }}</p>
      <nav class="link-row" aria-label="Contact and profiles">
        <a
          v-for="l in navLinks"
          :key="l.href"
          :href="l.href"
          :target="l.href.startsWith('mailto:') ? undefined : '_blank'"
          rel="noopener"
        >
          <IconGlyph :name="l.icon" />
          {{ l.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site, navLinks } from '@/data/site'
import IconGlyph from './IconGlyph.vue'
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

.link-row a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
</style>
