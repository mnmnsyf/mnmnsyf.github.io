<template>
  <footer class="footer">
    <div class="footer-cta">
      <p class="footer-kicker">{{ t('Seeking 2027 full-time roles') }}</p>
      <p class="footer-line">
        {{ t('Systems, graphics, simulation —') }} <em>{{ t('let’s talk.') }}</em>
      </p>
      <div class="footer-email">
        <a :href="`mailto:${email}`">{{ email }}</a>
        <button type="button" class="copy" @click="copy">
          <span aria-live="polite">{{ t(copied ? 'Copied' : 'Copy') }}</span>
        </button>
      </div>
    </div>
    <div class="footer-bottom">
      <nav class="link-row footer-links" :aria-label="t('Contact and profiles')">
        <a
          v-for="l in navLinks"
          :key="l.href"
          :href="assetUrl(l.href)"
          :target="l.href.startsWith('mailto:') ? undefined : '_blank'"
          rel="noopener"
        >
          <IconGlyph :name="l.icon" />
          {{ t(l.label) }}
        </a>
      </nav>
      <p class="footer-meta">
        <span
          >{{ t('Los Angeles') }} <span class="clock">{{ clock }}</span></span
        >
        <span>{{ t('Last updated') }} {{ t(site.lastUpdated) }}</span>
        <span>Vue · WebGL2 · Canvas</span>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { assetUrl } from '@/assetUrl'
import { site, navLinks } from '@/data/site'
import IconGlyph from './IconGlyph.vue'
import { t } from '@/i18n'

const email = navLinks.find((l) => l.href.startsWith('mailto:'))!.href.slice('mailto:'.length)
const copied = ref(false)
const clock = ref('PT')
let timer: ReturnType<typeof setInterval> | undefined
let reset: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    clearTimeout(reset)
    reset = setTimeout(() => (copied.value = false), 1800)
  } catch {
    window.location.href = `mailto:${email}`
  }
}

const formatter =
  typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : null
function tick() {
  if (formatter) clock.value = formatter.format(new Date())
}
onMounted(() => {
  tick()
  timer = setInterval(tick, 15000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
  clearTimeout(reset)
})
</script>

<style scoped>
.footer {
  margin-top: 160px;
  border-top: 1px solid var(--text);
  padding-top: 56px;
}
.footer-kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
}
.footer-line {
  margin: 14px 0 28px;
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 84px);
  line-height: 1;
  letter-spacing: -0.02em;
  max-width: 16ch;
}
.footer-line em {
  color: var(--text-muted);
}
.footer-email {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}
.footer-email a {
  font-size: clamp(18px, 2vw, 24px);
  color: var(--text);
  border-bottom: 1px solid var(--text);
}
.footer-email a:hover {
  color: var(--accent);
  border-color: var(--accent);
  text-decoration: none;
}
.copy {
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 5px 12px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  color: var(--text-muted);
  min-width: 72px;
}
.copy:hover {
  color: var(--text);
  border-color: var(--text-muted);
}
.footer-bottom {
  margin-top: 72px;
  padding: 22px 0 36px;
  border-top: 1px solid var(--rule);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px 32px;
}
.footer-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 0;
  color: var(--text-muted);
  font-size: 14px;
}
.footer-links a:hover {
  color: var(--text);
}
.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 24px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
}
.clock {
  color: var(--text);
  font-variant-numeric: tabular-nums;
}
</style>
