<template>
  <ol class="education">
    <li v-for="item in items" :key="item.school" v-reveal class="entry">
      <div class="when">
        <span class="period">{{ item.period }}</span>
        <span v-if="item.location">{{ item.location }}</span>
      </div>
      <div class="what">
        <h2 class="school">
          <a :href="item.href" target="_blank" rel="noopener noreferrer"
            >{{ item.school }} <span aria-hidden="true">↗</span></a
          >
        </h2>
        <p class="degree">
          {{ item.degree }}<span v-if="item.focus"> · {{ item.focus }}</span>
        </p>
        <dl class="details">
          <template v-if="item.honors?.length">
            <dt>{{ t('Honors') }}</dt>
            <dd>
              <span v-for="h in item.honors" :key="h" class="chip">{{ h }}</span>
            </dd>
          </template>
          <template v-if="item.coursework?.length">
            <dt>{{ t('Coursework') }}</dt>
            <dd>
              <span v-for="c in item.coursework" :key="c" class="chip">{{ c }}</span>
            </dd>
          </template>
        </dl>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { education } from '@/data/education'
import { localize, t } from '@/i18n'

const items = computed(() => localize(education))
</script>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 48px;
  padding: 44px 0;
  border-top: 1px solid var(--rule);
}
.entry:first-child {
  border-top-color: var(--text);
}
.when {
  display: grid;
  align-content: start;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
}
.period {
  color: var(--text);
}
.school {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 32px;
  line-height: 1.15;
}
.school a {
  color: var(--text);
}
.school a span {
  font-size: 0.6em;
  color: var(--accent);
}
.degree {
  margin: 8px 0 0;
  color: var(--text-muted);
}
.details {
  margin-top: 22px;
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 14px 20px;
}
dt {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding-top: 5px;
}
dd {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  font-size: 13px;
  padding: 3px 10px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  color: var(--text-muted);
}
@media (max-width: 860px) {
  .entry {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 32px 0;
  }
  .when {
    display: flex;
    gap: 14px;
  }
  .school {
    font-size: 27px;
  }
  .details {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  dd {
    margin-bottom: 10px;
  }
}
</style>
