<template>
  <header id="top" class="banner">
    <div class="inner">
      <div class="cols">
        <div class="photo-col">
          <img class="portrait" :src="site.photo.src" :alt="site.photo.alt" />
        </div>

        <div class="text-col">
          <span class="rule" />
          <p class="role">{{ site.roleLine }}</p>
          <h1 class="name">
            {{ site.name }}
            <span class="zh">{{ site.nameZh }}</span>
          </h1>

          <div class="bio prose">
            <!-- Authored as constants in src/data/site.ts; no external input. -->
            <p v-for="(para, i) in site.bio" :key="i" v-html="para" />
          </div>

          <span class="rule" />

          <nav class="btns" aria-label="Contact and profiles">
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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { site, navLinks } from '@/data/site'
import IconGlyph from './IconGlyph.vue'
</script>

<style scoped>
.banner {
  background: var(--bg-banner);
}

.inner {
  max-width: var(--measure-wide);
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.cols {
  display: grid;
  grid-template-columns: minmax(0, 392px) minmax(0, 1fr);
  gap: 3.5rem;
  align-items: center;
  padding-top: 1.5rem;
}

.portrait {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
}

/* The 30x5 accent bar that opens and closes the text column. */
.rule {
  display: block;
  width: 30px;
  height: 5px;
  background: var(--accent);
}

.role {
  margin: 1.6rem 0 0.5rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  color: #7a7a7a;
}

.name {
  font-size: clamp(2.4rem, 5.4vw, 3.9rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
}

.zh {
  font-weight: 500;
  font-size: 0.5em;
  color: var(--text-faint);
  letter-spacing: 0;
  margin-left: 0.3em;
  white-space: nowrap;
}

.bio {
  margin: 1.4rem 0 1.8rem;
  color: var(--text-muted);
}

/* Banner links are colour-only until hover, matching the reference banner. */
.bio :deep(a) {
  text-decoration: none;
}

.bio :deep(a:hover) {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.bio :deep(strong) {
  color: var(--text);
  font-weight: 600;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.8rem;
}

.btns a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.32rem 0.75rem;
  border: 1px solid var(--text);
  border-radius: 2px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text);
}

.btns a:hover {
  background: var(--text);
  color: var(--bg-banner);
  text-decoration: none;
}

@media (max-width: 860px) {
  .cols {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-top: 1.5rem;
  }

  .photo-col {
    max-width: 210px;
  }

  .inner {
    padding-bottom: 3rem;
  }
}
</style>
