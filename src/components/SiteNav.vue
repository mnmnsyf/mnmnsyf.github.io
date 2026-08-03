<template>
  <nav class="nav">
    <a class="brand" href="#top">{{ site.name }}</a>

    <ul class="anchors">
      <li v-for="s in sections" :key="s.id">
        <a :href="`#${s.id}`">{{ s.label }}</a>
      </li>
    </ul>

    <ul class="socials">
      <li v-for="l in navLinks" :key="l.href">
        <a
          :href="l.href"
          :title="l.label"
          :aria-label="l.label"
          :target="l.href.startsWith('mailto:') ? undefined : '_blank'"
          rel="noopener"
        >
          <IconGlyph :name="l.icon" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { site, navLinks, sections } from '@/data/site'
import IconGlyph from './IconGlyph.vue'
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: var(--nav-h);
}

.brand {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
  flex-shrink: 0;
}

.brand:hover {
  color: var(--accent);
  text-decoration: none;
}

.anchors {
  display: flex;
  gap: 1.4rem;
  margin: 0 auto;
}

.anchors a {
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.anchors a:hover {
  color: var(--accent);
  text-decoration: none;
}

.socials {
  display: flex;
  gap: 1.1rem;
  flex-shrink: 0;
  font-size: 1.05rem;
}

.socials a {
  color: var(--text);
  display: block;
}

.socials a:hover {
  color: var(--accent);
}

@media (max-width: 860px) {
  .anchors {
    display: none;
  }

  .socials {
    margin-left: auto;
  }
}
</style>
