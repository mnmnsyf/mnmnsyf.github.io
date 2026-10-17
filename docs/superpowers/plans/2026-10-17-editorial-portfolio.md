# Editorial Portfolio Implementation Plan

**Goal:** Redesign Yongfei She's existing Vue portfolio with the reference's quiet editorial layout and useful links for every project and experience.

**Architecture:** Preserve Vue, authored content, media, stable anchors, and GitHub Pages hosting. Introduce a persistent profile sidebar and a warm paper-like content column; keep project summaries visible and place long technical notes inside native disclosures.

**Tech Stack:** Vue 3, TypeScript, Vite, CSS, Node test runner, Vue SSR.

## Constraints

- Borrow composition from https://ianka1.github.io/#/; author original styling and copy.
- Preserve factual claims, dates and project status. No invented repositories or achievements.
- Every project and experience gets a meaningful link. Label workflow images, demos, institutions, and source repositories accurately.
- Responsive at 320px and desktop; visible keyboard focus; honor reduced motion.
- Work on `codex/editorial-portfolio-20261017`; retain the existing publication branch and workflow.

## Steps

- [x] Add `tests/portfolio.test.mjs` using Vite SSR and Node assertions; run `node --test tests/portfolio.test.mjs` and confirm missing resource links fail.
- [x] Update `src/data/projects.ts`, `experience.ts`, `education.ts`, and `types.ts` with verified public repositories, existing local demonstrations, and institution links.
- [x] Update `App.vue`, `SiteNav.vue`, `SiteHeader.vue`, and CSS for sidebar navigation, large typographic opening, featured editorial rows, and compact sections.
- [x] Update `ProjectEntry.vue` for visible resources and previews plus expandable technical notes; add experience resource navigation and accessible image links.
- [x] Run `node --test tests/portfolio.test.mjs`, `npm run build`, and `git diff --check`.
- [x] Inspect desktop and narrow browser views, navigation, disclosures, media, and browser logs; correct observed defects.
- [ ] Commit changes, push the source update through the existing deployment workflow, and verify publication if authentication is available. Otherwise provide a concrete local preview and reviewable branch.

