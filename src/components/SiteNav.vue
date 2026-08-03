<template>
  <div class="navbar" :class="{ solid }">
    <nav class="inner">
      <a class="brand" href="#top">{{ site.name }}</a>

      <ul class="anchors">
        <li v-for="s in sections" :key="s.id">
          <a :href="`#${s.id}`" :class="{ active: active === s.id }">{{ s.label }}</a>
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
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site, navLinks, sections } from '@/data/site'
import IconGlyph from './IconGlyph.vue'

/** Solid once the banner has scrolled under the bar; transparent over it. */
const solid = ref(false)
const active = ref('')

const observers: IntersectionObserver[] = []

onMounted(() => {
  const navH = 66

  const banner = document.getElementById('top')
  if (banner) {
    const io = new IntersectionObserver(
      ([entry]) => {
        solid.value = !entry.isIntersecting
      },
      { rootMargin: `-${navH}px 0px 0px 0px` },
    )
    io.observe(banner)
    observers.push(io)
  }

  /* Highlight whichever section currently occupies the band just below the bar.
     Several can qualify mid-scroll, so the first in document order wins. */
  const visible = new Set<string>()
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id)
        else visible.delete(entry.target.id)
      }
      active.value = sections.find((s) => visible.has(s.id))?.id ?? ''
    },
    { rootMargin: `-${navH + 12}px 0px -55% 0px` },
  )
  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (el) io.observe(el)
  }
  observers.push(io)
})

onBeforeUnmount(() => {
  for (const io of observers) io.disconnect()
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-banner);
  border-bottom: 1px solid transparent;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.navbar.solid {
  background: var(--bg);
  border-bottom-color: var(--rule);
  box-shadow: 0 1px 8px rgb(0 0 0 / 4%);
}

.inner {
  max-width: var(--measure-wide);
  margin: 0 auto;
  padding: 0 1.5rem;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  gap: 2rem;
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
  position: relative;
  display: block;
  padding: 0.35rem 0;
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.anchors a:hover {
  color: var(--accent);
  text-decoration: none;
}

.anchors a.active {
  color: var(--accent);
}

/* Underline sits on the bar's own bottom edge, as on the reference site. */
.anchors a.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(-0.5 * (var(--nav-h) - 1.4rem));
  height: 2px;
  background: var(--accent);
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
