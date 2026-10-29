import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { initLocale } from './i18n'

// After a redeploy, a cached page can request chunks that no longer exist.
// Reload to pick up the current build, at most once per 30 seconds.
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(sessionStorage.getItem('chunk-reload') ?? 0)
    if (Date.now() - last < 30_000) return
    sessionStorage.setItem('chunk-reload', String(Date.now()))
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

initLocale()
createApp(App).directive('reveal', reveal).mount('#app')
