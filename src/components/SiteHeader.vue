<template>
  <div id="top" class="entry">
    <header class="hero">
      <VoronoiField />
      <div class="hero-scrim" aria-hidden="true"></div>
      <div class="hero-inner">
        <p class="hero-kicker">
          <span class="status-dot" aria-hidden="true"></span
          >{{ t('Welcome to my personal website.') }}
        </p>
        <h1 class="hero-title">
          <span class="hero-line"
            ><span>{{ site.name }}</span></span
          >
        </h1>
        <p v-if="locale === 'zh'" class="hero-role">
          游戏开发，做高性能的 <em>C++ 系统</em>、<em>工具</em>和<em>仿真</em>。
        </p>
        <p v-else class="hero-role">
          Software engineer building high-performance <em>C++ systems</em>, <em>tools</em> &amp;
          <em>simulation</em>.
        </p>
        <ul class="hero-facts">
          <li v-for="fact in facts" :key="fact.label">
            <span>{{ t(fact.label) }}</span
            >{{ t(fact.text) }}
          </li>
        </ul>
        <div class="hero-actions">
          <a class="button button-primary" href="#/projects"
            >{{ t('Selected work') }} <span aria-hidden="true">→</span></a
          >
          <a class="button" :href="assetUrl(resumeHref)" target="_blank" rel="noopener"
            >{{ t('Résumé (PDF)') }} <span aria-hidden="true">↗</span></a
          >
          <a class="button" href="mailto:sheyfff@gmail.com">{{ t('Get in touch') }}</a>
        </div>
      </div>
      <p class="hero-hint" data-no-site>
        <span class="hint-desktop">{{
          t('Move to disturb the field · click to add a site.')
        }}</span>
        {{ t('Voronoi partitions also ran') }}
        <a href="#/projects/project-mo">{{ t('land ownership in Mandate Order →') }}</a>
      </p>
    </header>

    <section class="entry-section about" aria-labelledby="about-heading">
      <h2 id="about-heading" class="entry-label">{{ t('About') }}</h2>
      <div class="about-copy prose">
        <!-- Authored HTML constants in src/data/site.ts; no external input is rendered. -->
        <p
          v-for="(paragraph, index) in site.bio"
          :key="index"
          v-reveal="index * 40"
          v-html="t(paragraph)"
        />
      </div>
    </section>

    <section class="entry-section" aria-labelledby="numbers-heading">
      <h2 id="numbers-heading" class="entry-label">{{ t('In numbers') }}</h2>
      <StatStrip v-reveal />
    </section>

    <section class="entry-section" aria-labelledby="work-heading">
      <div class="entry-label-row">
        <h2 id="work-heading" class="entry-label">{{ t('Selected work') }}</h2>
        <a class="entry-more" href="#/projects">{{ t('All projects →') }}</a>
      </div>
      <WorkIndex />
    </section>

    <section class="entry-section shipped" aria-labelledby="shipped-heading">
      <h2 id="shipped-heading" class="entry-label">{{ t('Shipped') }}</h2>
      <div class="shipped-grid">
        <ScreenshotCarousel
          :slides="mandateOrderScreenshots"
          label="Mandate Order featured screenshots"
          class="shipped-carousel"
        />
        <div class="shipped-copy">
          <p class="mono-label">{{ t('Digital Sky · Steam Early Access · Aug 2026') }}</p>
          <h3>Mandate Order</h3>
          <p>
            {{
              t(
                'A Warring States war city-builder with real-time battles of thousands of soldiers. I built production C++ systems for it in Unreal Engine 5: threat-aware routing, spatial grouping, command relay, Voronoi land plots, the battle frontline, the skill system, and the input and UI layers.',
              )
            }}
          </p>
          <a class="button" href="#/projects/project-mo"
            >{{ t('Inside the systems') }} <span aria-hidden="true">→</span></a
          >
        </div>
      </div>
    </section>

    <section class="entry-section" aria-labelledby="latest-heading">
      <div class="entry-label-row">
        <h2 id="latest-heading" class="entry-label">{{ t('Latest') }}</h2>
        <a class="entry-more" href="#/news">{{ t('All updates →') }}</a>
      </div>
      <ol class="latest">
        <li v-for="item in latest" :key="item.date + item.text" v-reveal>
          <time>{{ item.date }}</time>
          <p>{{ item.text }}</p>
        </li>
      </ol>
    </section>
  </div>
</template>
<script setup lang="ts">
import { assetUrl } from '@/assetUrl'
import { resumeHref, site } from '@/data/site'
import { news } from '@/data/news'
import { locale, localize, t } from '@/i18n'
import { mandateOrderScreenshots } from '@/data/mandateOrderScreenshots'
import ScreenshotCarousel from './ScreenshotCarousel.vue'
import StatStrip from './StatStrip.vue'
import WorkIndex from './WorkIndex.vue'
import VoronoiField from './demos/VoronoiField.vue'
import { computed } from 'vue'

const facts = [
  { label: 'Now', text: 'Research · UCLA AIVC Lab' },
  { label: 'Study', text: 'M.S. CS · USC, May 2027' },
  { label: 'Algorithms', text: 'ICPC silver medalist' },
  { label: 'Open to', text: '2027 full-time SDE roles' },
]
const latest = computed(() => localize(news.slice(0, 3)))
</script>
