<template>
  <header class="site-header">
    <div class="identity">
      <h1 class="name">
        {{ site.name }}
        <span class="name-zh">{{ site.nameZh }}</span>
      </h1>
      <p class="role">{{ site.title }}</p>

      <ul class="affiliations">
        <li v-for="a in site.affiliations" :key="a.text">
          <a v-if="a.href" :href="a.href" target="_blank" rel="noopener">{{ a.text }}</a>
          <span v-else>{{ a.text }}</span>
          <span v-if="a.detail" class="faint"> — {{ a.detail }}</span>
        </li>
      </ul>

      <nav class="link-row" aria-label="Contact and profiles">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          :target="l.href.startsWith('mailto:') ? undefined : '_blank'"
          rel="noopener"
          >{{ l.label }}</a
        >
      </nav>

      <p class="seeking">{{ site.seeking }}</p>
    </div>

    <img class="portrait" :src="site.photo.src" :alt="site.photo.alt" />
  </header>

  <div class="intro prose measure">
    <p v-for="(para, i) in site.intro" :key="i">{{ para }}</p>
  </div>
</template>

<script setup lang="ts">
import { site, links } from '@/data/site'
</script>

<style scoped>
.site-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2.5rem;
  padding-top: 4rem;
}

.name {
  font-size: 1.85rem;
  letter-spacing: -0.01em;
}

.name-zh {
  font-weight: 400;
  color: var(--text-faint);
  margin-left: 0.4rem;
  font-size: 0.95em;
}

.role {
  margin: 0.15rem 0 0.9rem;
  color: var(--text-muted);
}

.affiliations {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin-bottom: 1.1rem;
}

.affiliations li + li {
  margin-top: 0.15rem;
}

.seeking {
  margin-top: 1.1rem;
  font-size: 0.92rem;
  color: var(--text);
  border-left: 2px solid var(--accent);
  padding-left: 0.7rem;
}

.portrait {
  width: 148px;
  flex-shrink: 0;
  object-fit: cover;
  aspect-ratio: 1;
}

.intro {
  margin-top: 2.5rem;
}

@media (max-width: 640px) {
  .site-header {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 1.5rem;
    padding-top: 2.5rem;
  }

  .portrait {
    width: 116px;
  }
}
</style>
