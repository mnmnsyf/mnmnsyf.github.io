<template>
  <header id="top" class="intro-header">
    <div class="editorial-kicker">
      <span class="small-star" aria-hidden="true">✳</span> A few things I've built.
    </div>
    <h1>Systems that scale.<br />Worlds that <em>move.</em></h1>
    <div class="intro-bottom">
      <div class="intro-copy">
        <p>
          I'm <strong>{{ site.name }}</strong
          >, a C++ software engineer working where systems, graphics, and simulation meet.
        </p>
        <p>
          From large-scale battles at
          <a href="https://www.digisky.com/" target="_blank" rel="noopener noreferrer"
            >Digital Sky ↗</a
          >
          to articulated-object research at
          <a href="https://www.math.ucla.edu/aivc/" target="_blank" rel="noopener noreferrer"
            >UCLA's AIVC Lab ↗</a
          >, I build the algorithms and tools behind interactive worlds.
        </p>
        <a class="text-cta" href="#projects"
          >Explore selected work <span aria-hidden="true">↓</span></a
        >
      </div>
      <aside class="intro-note">
        <span class="note-pin" aria-hidden="true">✳</span>
        <span class="eyebrow">CURRENTLY</span>
        <p>Research at UCLA.<br />Computer science at USC.</p>
        <span class="availability"
          ><span aria-hidden="true"></span> Seeking 2027 full-time roles</span
        >
        <a href="mailto:sheyfff@gmail.com">Let's connect <span aria-hidden="true">↗</span></a>
      </aside>
    </div>
    <div class="featured-heading">
      <span class="eyebrow">A FEW STARTING POINTS</span><span aria-hidden="true">↙</span>
    </div>
    <nav class="featured-work" aria-label="Featured work">
      <a
        v-for="(item, index) in highlights"
        :key="item.href"
        :href="item.href"
        class="featured-row"
      >
        <span class="featured-number">0{{ index + 1 }}</span>
        <span class="featured-copy"
          ><span class="eyebrow">{{ item.label }}</span
          ><strong>{{ item.title }}</strong></span
        >
        <img :src="item.image" :alt="item.alt" loading="lazy" width="140" height="84" />
        <span class="featured-arrow" aria-hidden="true">↗</span>
      </a>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { site } from '@/data/site'
const highlights = [
  {
    label: 'RESEARCH / SECOND AUTHOR',
    title: 'ArticulateArena',
    href: '#articulatearena',
    image: '/articulatearena-category.png',
    alt: 'Articulated objects from ArticulateArena',
  },
  {
    label: 'C++ / C# / DEVELOPER TOOLS',
    title: 'ANGLE Graphics SDK',
    href: '#angle-graphics-sdk',
    image: '/angle-sdk-architecture.svg',
    alt: 'ANGLE SDK architecture',
  },
  {
    label: 'SHIPPED / C++ / UNREAL ENGINE',
    title: 'Mandate Order',
    href: '#project-mo',
    image: '/mandate-order.png',
    alt: 'Mandate Order on Steam',
  },
]
</script>
