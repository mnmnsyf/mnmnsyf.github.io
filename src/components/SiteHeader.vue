<template>
  <div id="top" class="entry">
    <header class="hero">
      <VoronoiField />
      <div class="hero-scrim" aria-hidden="true"></div>
      <div class="hero-inner">
        <p class="hero-kicker">
          <span class="status-dot" aria-hidden="true"></span>Welcome to my personal website.
        </p>
        <h1 class="hero-title">
          <span class="hero-line"
            ><span>{{ site.name }}</span></span
          >
        </h1>
        <p class="hero-role">
          C++ software engineer building <em>systems</em>, <em>graphics</em> &amp;
          <em>simulation</em>.
        </p>
        <ul class="hero-facts">
          <li><span>Now</span>Research · UCLA AIVC Lab</li>
          <li><span>Study</span>M.S. CS · USC, May 2027</li>
          <li><span>Open to</span>2027 full-time roles</li>
        </ul>
        <div class="hero-actions">
          <a class="button button-primary" href="#/projects"
            >Selected work <span aria-hidden="true">→</span></a
          >
          <a class="button" href="mailto:sheyfff@gmail.com">Get in touch</a>
        </div>
      </div>
      <p class="hero-hint" data-no-site>
        <span class="hint-desktop">Move to disturb the field · click to add a site.</span>
        Voronoi partitions also ran
        <a href="#/projects/project-mo">land ownership in Mandate Order →</a>
      </p>
    </header>

    <section class="entry-section about" aria-labelledby="about-heading">
      <h2 id="about-heading" class="entry-label">About</h2>
      <div class="about-copy prose">
        <!-- Authored HTML constants in src/data/site.ts; no external input is rendered. -->
        <p
          v-for="(paragraph, index) in site.bio"
          :key="index"
          v-reveal="index * 40"
          v-html="paragraph"
        />
      </div>
    </section>

    <section class="entry-section" aria-labelledby="numbers-heading">
      <h2 id="numbers-heading" class="entry-label">In numbers</h2>
      <StatStrip v-reveal />
    </section>

    <section class="entry-section" aria-labelledby="work-heading">
      <div class="entry-label-row">
        <h2 id="work-heading" class="entry-label">Selected work</h2>
        <a class="entry-more" href="#/projects">All projects →</a>
      </div>
      <WorkIndex />
    </section>

    <section class="entry-section shipped" aria-labelledby="shipped-heading">
      <h2 id="shipped-heading" class="entry-label">Shipped</h2>
      <div class="shipped-grid">
        <ScreenshotCarousel
          :slides="mandateOrderScreenshots"
          label="Mandate Order featured screenshots"
          class="shipped-carousel"
        />
        <div class="shipped-copy">
          <p class="mono-label">Digital Sky · Steam Early Access · Aug 2026</p>
          <h3>Mandate Order</h3>
          <p>
            A Warring States war city-builder with real-time battles of thousands of soldiers. I
            built production C++ systems for it in Unreal Engine 5 — instanced rendering, a
            multithreaded ECS, threat-aware routing, Voronoi land plots and a living frontline.
          </p>
          <a class="button" href="#/projects/project-mo"
            >Inside the systems <span aria-hidden="true">→</span></a
          >
        </div>
      </div>
    </section>

    <section class="entry-section" aria-labelledby="latest-heading">
      <div class="entry-label-row">
        <h2 id="latest-heading" class="entry-label">Latest</h2>
        <a class="entry-more" href="#/news">All updates →</a>
      </div>
      <ol class="latest">
        <li v-for="item in news.slice(0, 3)" :key="item.date + item.text" v-reveal>
          <time>{{ item.date }}</time>
          <p>{{ item.text }}</p>
        </li>
      </ol>
    </section>
  </div>
</template>
<script setup lang="ts">
import { site } from '@/data/site'
import { news } from '@/data/news'
import { mandateOrderScreenshots } from '@/data/mandateOrderScreenshots'
import ScreenshotCarousel from './ScreenshotCarousel.vue'
import StatStrip from './StatStrip.vue'
import WorkIndex from './WorkIndex.vue'
import VoronoiField from './demos/VoronoiField.vue'
</script>
