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

      <nav class="featured-work" aria-label="Selected work">
        <a v-for="item in featuredWork" :key="item.href" :href="item.href" class="work-link">
          <img :src="item.image" :alt="item.alt" loading="lazy" />
          <span class="work-copy">
            <span class="work-label">{{ item.label }}</span>
            <strong>{{ item.title }}</strong>
          </span>
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { site, navLinks, featuredWork } from '@/data/site'
import IconGlyph from './IconGlyph.vue'
</script>

<style scoped>
.banner {
  background: var(--bg-banner);
}

.inner {
  max-width: var(--measure-wide);
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.cols {
  display: grid;
  grid-template-columns: minmax(0, 270px) minmax(0, 1fr);
  gap: 3rem;
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

.featured-work {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2.5rem;
}

.work-link {
  display: block;
  overflow: hidden;
  border: 1px solid var(--rule);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
}

.work-link:hover {
  border-color: var(--accent);
  text-decoration: none;
}

.work-link img {
  width: 100%;
  aspect-ratio: 2.4;
  object-fit: contain;
  background: var(--bg-inset);
}

.work-copy {
  display: grid;
  gap: 0.15rem;
  padding: 0.8rem 1rem;
}

.work-label {
  font-size: 0.74rem;
  color: var(--text-muted);
}

.work-copy strong {
  font-size: 0.93rem;
  font-weight: 600;
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

@media (max-width: 640px) {
  .photo-col {
    max-width: 168px;
  }

  .cols {
    gap: 1.5rem;
  }

  .featured-work {
    grid-template-columns: 1fr;
    gap: 0.7rem;
    margin-top: 2rem;
  }

  .work-link {
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr);
    align-items: center;
  }

  .work-link img {
    height: 84px;
    aspect-ratio: auto;
  }

  .work-copy {
    padding: 0.6rem 0.8rem;
  }
}
</style>
