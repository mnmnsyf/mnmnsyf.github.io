import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

const server = await createServer({
  configFile: false,
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('../src', import.meta.url)) } },
  server: { middlewareMode: true },
  appType: 'custom',
})
after(() => server.close())
const { projectGroups } = await server.ssrLoadModule('/src/data/projects.ts')
const { experience } = await server.ssrLoadModule('/src/data/experience.ts')
const { articulateArena } = await server.ssrLoadModule('/src/data/publications.ts')
const { default: App } = await server.ssrLoadModule('/src/App.vue')
const app = createSSRApp(App)
app.directive('reveal', { getSSRProps: () => ({}) })
const html = await renderToString(app)

test('every project has an accurately labelled usable resource', () => {
  for (const project of [...projectGroups.flatMap((group) => group.projects), articulateArena]) {
    assert.ok(project.links?.length, `${project.title} needs a resource link`)
    const start = html.indexOf(`<article id="${project.id}"`)
    assert.ok(start >= 0, `${project.title} must render`)
    const article = html.slice(start, html.indexOf('</article>', start))
    for (const link of project.links) {
      assert.ok(link.label.trim())
      assert.match(link.href, /^(https:\/\/|\/(?!\/))/)
      assert.ok(
        article.includes(link.href.replaceAll('&', '&amp;')),
        `${project.title} must display ${link.label}`,
      )
    }
  }
})

test('each experience includes an organization or project resource', () => {
  const rows = [...html.matchAll(/<nav class="link-row experience-links"[^>]*>(.*?)<\/nav>/g)]
  assert.equal(rows.length, experience.length)
  for (const [index, item] of experience.entries()) {
    assert.ok(item.links?.length, `${item.role} at ${item.org} needs a resource link`)
    for (const link of item.links)
      assert.ok(rows[index][1].includes(link.href.replaceAll('&', '&amp;')))
  }
})

test('all in-page links resolve to unique existing anchors', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
  assert.equal(new Set(ids).size, ids.length, 'duplicate anchor')
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(target), `missing anchor: ${target}`)
  }
})

test('portfolio renders a keyboard skip link and one main landmark', () => {
  assert.match(html, /href="#main-content"/)
  assert.equal([...html.matchAll(/<main\b/g)].length, 1)
})
