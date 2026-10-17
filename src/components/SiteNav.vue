<template>
  <aside class="sidebar">
    <a href="#top" class="profile-link" aria-label="Yongfei She — back to introduction">
      <img
        class="sidebar-portrait"
        :src="site.photo.src"
        :alt="site.photo.alt"
        width="112"
        height="112"
      />
      <span class="profile-name">{{ site.name }}</span>
      <span class="profile-zh" lang="zh">{{ site.nameZh }}</span>
    </a>
    <p class="sidebar-role">C++ engineer.<br />Graphics & simulation.</p>
    <nav class="section-nav" aria-label="Main navigation">
      <a
        v-for="(section, index) in sections"
        :key="section.id"
        :href="`#${section.id}`"
        :class="{ active: active === section.id }"
        :aria-current="active === section.id ? 'location' : undefined"
      >
        <span class="nav-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
        {{ section.label }}<span class="nav-dot" aria-hidden="true">●</span>
      </a>
    </nav>
    <div class="sidebar-bottom">
      <p>Los Angeles, CA</p>
      <nav class="sidebar-socials" aria-label="Contact and profiles">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
          rel="noopener noreferrer"
        >
          {{ link.label }} <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <span class="sidebar-edition">PORTFOLIO / 2026</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site, navLinks, sections } from '@/data/site'
const active = ref('top')
let pending = false
function updateActive() {
  const line = window.innerHeight * 0.3
  let current = 'top'
  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (element && element.getBoundingClientRect().top <= line) current = section.id
  }
  active.value = current
  pending = false
}
function onScroll() {
  if (!pending) {
    pending = true
    window.requestAnimationFrame(updateActive)
  }
}
onMounted(() => {
  updateActive()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>
