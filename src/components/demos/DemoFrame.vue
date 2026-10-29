<template>
  <figure class="demo">
    <div class="demo-bar">
      <span class="demo-live"><span class="pulse" aria-hidden="true"></span>{{ t('Live') }}</span>
      <span class="demo-label">{{ t(label) }}</span>
      <span class="demo-readout" aria-hidden="true"><slot name="readout" /></span>
    </div>
    <div class="demo-stage">
      <slot />
      <p class="demo-hint" aria-hidden="true">{{ t(hint) }}</p>
    </div>
    <div class="demo-controls"><slot name="controls" /></div>
    <figcaption>{{ t(caption) }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

defineProps<{ label: string; hint: string; caption: string }>()
</script>

<style scoped>
.demo {
  margin: 28px 0 0;
  border: 1px solid var(--rule);
  background: var(--bg-raised);
  border-radius: 10px;
  overflow: hidden;
}
.demo-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--rule);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.demo-live {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--accent);
}
.pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 var(--accent);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  70% {
    box-shadow: 0 0 0 6px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
.demo-readout {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
  text-transform: none;
  white-space: nowrap;
}
.demo-stage {
  position: relative;
  aspect-ratio: 16 / 8;
  background-image: radial-gradient(var(--rule) 1px, transparent 1px);
  background-size: 22px 22px;
}
.demo-stage :deep(canvas) {
  width: 100%;
  height: 100%;
  touch-action: none;
  cursor: grab;
}
.demo-stage :deep(canvas:active) {
  cursor: grabbing;
}
.demo-hint {
  position: absolute;
  left: 14px;
  top: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  pointer-events: none;
}
.demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  padding: 10px 14px;
  border-top: 1px solid var(--rule);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}
.demo-controls:empty {
  display: none;
}
.demo-controls :deep(button) {
  padding: 4px 10px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s;
}
.demo-controls :deep(button:hover) {
  color: var(--text);
  border-color: var(--text-muted);
}
.demo-controls :deep(button[aria-pressed='true']) {
  color: var(--bg);
  background: var(--text);
  border-color: var(--text);
}
.demo-controls :deep(label) {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.demo-controls :deep(input[type='range']) {
  accent-color: var(--accent);
  width: 120px;
}
figcaption {
  padding: 0 14px 12px;
  font-size: 13px;
  color: var(--text-muted);
}
@media (max-width: 640px) {
  .demo-stage {
    aspect-ratio: 4 / 3;
  }
  .demo-label {
    display: none;
  }
}
</style>
