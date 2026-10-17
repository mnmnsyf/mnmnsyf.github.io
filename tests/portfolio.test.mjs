import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

const server = await createServer({
  base: process.env.VITE_BASE_PATH || '/',
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
const { sections } = await server.ssrLoadModule('/src/data/site.ts')
const { resolveRoute, sectionHref } = await server.ssrLoadModule('/src/navigation.ts')
async function renderPage(initialHash) {
  const app = createSSRApp(App, { initialHash })
  app.directive('reveal', { getSSRProps: () => ({}) })
  return renderToString(app)
}
const pages = new Map(
  await Promise.all(
    sections.map(async (section) => [section.id, await renderPage(sectionHref(section.id))]),
  ),
)
const html = [...pages.values()].join('')
const allProjects = projectGroups.flatMap((group) => group.projects)
// Projects render one at a time, so each has its own route.
const projectPages = new Map(
  await Promise.all(
    allProjects.map(async (project) => [project.id, await renderPage(`#/projects/${project.id}`)]),
  ),
)
const projectHtml = [...projectPages.values()].join('')
const routeCache = new Map()
async function renderRoute(hash) {
  if (!routeCache.has(hash)) routeCache.set(hash, await renderPage(hash))
  return routeCache.get(hash)
}

test('every project has an accurately labelled usable resource', () => {
  for (const project of [...projectGroups.flatMap((group) => group.projects), articulateArena]) {
    assert.ok(project.links?.length, `${project.title} needs a resource link`)
    const source = html + projectHtml
    const start = source.indexOf(`<article id="${project.id}"`)
    assert.ok(start >= 0, `${project.title} must render`)
    const article = source.slice(start, source.indexOf('</article>', start))
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

test('all section and project links resolve to independently rendered destinations', async () => {
  for (const [section, pageHtml] of [...pages, ...projectPages]) {
    const ids = [...pageHtml.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
    assert.equal(new Set(ids).size, ids.length, `duplicate anchor in ${section}`)
    for (const [, target] of pageHtml.matchAll(/href="#([^"]+)"/g)) {
      if (target === 'main-content') {
        assert.ok(ids.includes(target))
        continue
      }
      const route = resolveRoute(`#${target}`)
      assert.ok(pages.has(route.section), `missing section for ${target}`)
      const destination = route.target ? await renderRoute(`#${target}`) : pages.get(route.section)
      if (route.target)
        assert.ok(destination.includes(`id="${route.target}"`), `missing target ${target}`)
      assert.ok(target === '/' || route.section !== 'top', `unrecognized route ${target}`)
    }
  }
})

test('portfolio renders a keyboard skip link and one main landmark', () => {
  for (const [section, pageHtml] of pages) {
    assert.match(pageHtml, /href="#main-content"/)
    assert.equal([...pageHtml.matchAll(/<main\b/g)].length, 1)
    assert.equal([...pageHtml.matchAll(/<h1\b/g)].length, 1)
    const activeLink = [...pageHtml.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)]
    assert.equal(activeLink.length, 1)
    assert.ok(activeLink[0][0].includes(`href="${sectionHref(section)}"`))
  }
})

test('Mandate Order replaces static previews with screenshot carousels', () => {
  assert.equal([...html.matchAll(/aria-roledescription="carousel"/g)].length, 2)
  assert.ok(html.includes('Next screenshot'))
  assert.ok(html.includes('Pause slideshow'))
  for (let index = 1; index <= 4; index++) {
    assert.ok(html.includes(`/mandate-order-steam-${index}.jpg`))
  }
})

test('carousel navigation wraps and pauses automatic changes for interaction and reduced motion', async () => {
  const { createCarouselState } = await server.ssrLoadModule('/src/components/carouselState.ts')
  const state = createCarouselState(4)
  state.previous()
  assert.equal(state.active.value, 3)
  state.next()
  assert.equal(state.active.value, 0)
  state.select(2)
  assert.equal(state.active.value, 2)
  state.advance({ visible: true, interacting: false, reducedMotion: true })
  assert.equal(state.active.value, 2)
  state.advance({ visible: true, interacting: true, reducedMotion: false })
  assert.equal(state.active.value, 2)
  state.advance({ visible: false, interacting: false, reducedMotion: false })
  assert.equal(state.active.value, 2)
  state.togglePause()
  state.advance({ visible: true, interacting: false, reducedMotion: false })
  assert.equal(state.active.value, 2)
  state.togglePause()
  state.advance({ visible: true, interacting: false, reducedMotion: false })
  assert.equal(state.active.value, 3)
})

test('Entry and Projects render as separate sections', async () => {
  const entryHtml = pages.get('top')
  assert.ok(entryHtml.includes('Welcome to my personal website.'))
  assert.ok(!entryHtml.includes('<article id="project-mo"'))
  const projectsHtml = pages.get('projects')
  assert.ok(projectsHtml.includes('<article id="project-mo"'))
  assert.ok(!projectsHtml.includes('Welcome to my personal website.'))
  assert.ok(!projectsHtml.includes('id="experience"'))
  for (const section of sections) {
    assert.equal([...pages.get(section.id).matchAll(/data-section="[^"]+"/g)].length, 1)
  }
})

test('navigation resolves section URLs and legacy project anchors', async () => {
  assert.deepEqual(resolveRoute('#/projects/project-mo'), {
    section: 'projects',
    target: 'project-mo',
  })
  assert.deepEqual(resolveRoute('#project-mo'), { section: 'projects', target: 'project-mo' })
  assert.deepEqual(resolveRoute('#articulatearena'), {
    section: 'research',
    target: 'articulatearena',
  })
  assert.deepEqual(resolveRoute('#/experience'), { section: 'experience', target: null })
  assert.deepEqual(resolveRoute('#/'), { section: 'top', target: null })
  assert.deepEqual(resolveRoute('#/research/project-mo'), { section: 'research', target: null })
  assert.deepEqual(resolveRoute('#%malformed'), { section: 'top', target: null })
  const legacy = await renderPage('#project-mo')
  assert.ok(legacy.includes('data-section="projects"'))
  assert.ok(legacy.includes('<article id="project-mo"'))
})

test('asset URLs respect preview subdirectories without changing external or section links', async () => {
  const { assetUrl } = await server.ssrLoadModule('/src/assetUrl.ts')
  assert.equal(assetUrl('/portrait.jpg', '/portfolio-preview/'), '/portfolio-preview/portrait.jpg')
  assert.equal(assetUrl('/portrait.jpg', '/'), '/portrait.jpg')
  assert.equal(
    assetUrl('https://example.com/demo.mp4', '/portfolio-preview/'),
    'https://example.com/demo.mp4',
  )
  assert.equal(assetUrl('#/projects/project-mo', '/portfolio-preview/'), '#/projects/project-mo')
  assert.equal(assetUrl(undefined, '/portfolio-preview/'), undefined)
  for (const pageHtml of pages.values()) {
    for (const [, path] of pageHtml.matchAll(/(?:src|poster|href)="(\/[^\/"]+)"/g)) {
      assert.ok(path.startsWith(server.config.base), `asset outside build base: ${path}`)
    }
  }
})

test('website uses Fiona without Chinese profile text and describes ongoing deep learning', () => {
  const entry = pages.get('top')
  assert.ok(entry.includes('Fiona She'))
  for (const pageHtml of pages.values()) {
    const text = pageHtml.replace(/<[^>]*>/g, '')
    assert.ok(!text.includes('Yongfei'))
    assert.ok(!/[\u3400-\u9fff]/u.test(text))
  }
  assert.ok(entry.includes('C++ software systems'))
  assert.ok(entry.includes('CSCI 566'))
  assert.ok(entry.includes('deep learning'))
  assert.ok(entry.includes('PyTorch'))
})

test('interactive layer: live demos, hero field and on-demand command palette', () => {
  for (const id of ['jello-simulation', 'ik-skinning']) {
    const projectsHtml = projectPages.get(id)
    const start = projectsHtml.indexOf(`<article id="${id}"`)
    const article = projectsHtml.slice(start, projectsHtml.indexOf('</article>', start))
    assert.match(article, /<canvas[^>]*role="img"/, `${id} needs its live demo`)
    assert.ok(article.includes('not the original C++ code'), `${id} demo must be labelled`)
  }
  const entry = pages.get('top')
  assert.ok(entry.includes('class="voronoi-field'))
  assert.ok(entry.includes('19,977'))
  for (const pageHtml of pages.values()) {
    assert.ok(pageHtml.includes('aria-label="Open command palette"'))
    assert.ok(!pageHtml.includes('role="dialog"'), 'palette renders only when opened')
  }
})

test('project notes toggle sits beside resources and highlights come from authored text', async () => {
  const { metricFigure, splitLead, projectHighlights } =
    await server.ssrLoadModule('/src/projectText.ts')
  assert.equal(metricFigure('Connected-component computation cut to ~25% of original time'), '~25%')
  assert.equal(metricFigure('ArticulateArena-20K: 19,977 articulated objects'), '19,977')
  assert.equal(metricFigure('Released on Steam Early Access, 12 Aug 2026'), null)
  assert.deepEqual(splitLead('First sentence is here. Second one follows.'), {
    lead: 'First sentence is here.',
    rest: 'Second one follows.',
  })
  for (const project of allProjects) {
    const projectsHtml = projectPages.get(project.id)
    const start = projectsHtml.indexOf(`<article id="${project.id}"`)
    const article = projectsHtml.slice(start, projectsHtml.indexOf('</article>', start))
    const actions = article.slice(
      article.indexOf('class="p-actions"'),
      article.indexOf('</header>'),
    )
    if (project.body?.length || project.modules?.length) {
      assert.ok(actions.includes('project-links'), `${project.title} resources`)
      assert.ok(actions.includes(`aria-controls="${project.id}-notes"`), `${project.title} toggle`)
      assert.ok(actions.includes('aria-expanded="true"'), `${project.title} notes start expanded`)
      const notes = article.slice(article.indexOf(`id="${project.id}-notes"`))
      assert.ok(!/^[^>]*\binert\b/.test(notes), `${project.title} notes are not inert`)
      for (const highlight of projectHighlights(project))
        assert.ok(article.includes(`id="${highlight.target}"`), `${highlight.target} target`)
    }
  }
})

test('projects show one entry at a time with Mandate Order first and clear switching', async () => {
  const countArticles = (page) => [...page.matchAll(/<article id="/g)].length
  assert.equal(countArticles(pages.get('projects')), 1)
  assert.ok(pages.get('projects').includes('<article id="project-mo"'))
  for (const [id, page] of projectPages) {
    assert.equal(countArticles(page), 1, `${id} renders alone`)
    assert.ok(page.includes(`<article id="${id}"`))
    const currentLinks = [...page.matchAll(/<a\b[^>]*\brail-link\b[^>]*aria-current="true"/g)]
    assert.equal(currentLinks.length, 1, `${id} highlights one index entry`)
    assert.ok(currentLinks[0][0].includes(`href="#/projects/${id}"`))
    assert.ok(page.includes('aria-label="Next project:'))
    assert.ok(page.includes('aria-label="Previous project:'))
  }
  const group = projectGroups[1]
  assert.ok(
    (await renderRoute(`#/projects/${group.id}`)).includes(`<article id="${group.projects[0].id}"`),
  )
})
