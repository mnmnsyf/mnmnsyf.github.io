# Full-time Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Update Yongfei She’s existing portfolio for 2027 full-time C++ systems, graphics, simulation, and research engineering opportunities.

**Architecture:** Keep the Vue components and typed content modules. Reuse ProjectEntry for the publication; put three compact links to the strongest work below the bio. Preserve the existing ExperienceList.vue working-tree changes.

**Tech Stack:** Vue 3, TypeScript, Vite 7; existing CSS and media; Playwright with installed Edge for verification.

## Global Constraints

- Identity: C++ software engineer, ICPC medalist, UCLA Research Assistant. Do not lead with student identity.
- USC graduation: May 2027. Main target: 2027 full-time employment.
- ArticulateArena is an arXiv preprint, dated September 27, 2026; second author, not an accepted ICLR publication.
- Credit personal contributions to joint-motion metric development and multi-model evaluation. Credit the 19,977-object dataset to the collaborative paper.
- Digital Sky internship: September 2023–July 2024; full-time: July 2024–December 2025. GPU instancing, multithreaded ECS, and Dijkstra belong to the full-time period.
- Retain all existing project media and dates. Do not invent renderer benchmark conditions or GPU/ML experience.
- Work in the existing codex/sde-portfolio-update branch; no push or deployment in this request.

### Task 1: Update content and make strongest work discoverable

**Files:** src/data/site.ts, experience.ts, education.ts, news.ts, projects.ts, skills.ts; index.html; src/data/publications.ts; src/components/SiteHeader.vue; src/App.vue; public/articulatearena-category.png.

- [x] Replace bio with concise engineering/research identity, industry evidence, public paper, and full-time availability. Update lastUpdated to October 2026 and SEO title/description.
- [x] Split Digital Sky into full-time and intern entries. Add paper/evaluation work to UCLA; retain the algorithm-lab entry.
- [x] Set USC period to `Jan 2026 – May 2027 (expected)` and use the four supplied resume courses.
- [x] Add September 2026 paper news. Add the following typed publication using the existing Project interface: id `articulatearena`, title `ArticulateArena: A Metric for Articulated Kinematics`, role `Second author`, period `arXiv preprint · Sep 2026`, project/Paper links, shared dataset metrics, personal contribution paragraph, complete verified author list, and public Figure 1.
- [x] Render it with existing components before Experience:

```vue
<SectionBlock id="research" title="Research">
  <ProjectEntry :project="articulateArena" />
</SectionBlock>
```

- [x] Add three header links with real thumbnails: ArticulateArena → `#articulatearena`; C++ renderer → `#software-rasterizer`; shader/engine systems → `#engine-subsystems`. Reuse existing graphics and paper figure.
- [x] Add concrete source/demo links to existing projects; shorten engine and renderer prose without changing facts. Add systems/research skill groups using supplied facts.

### Task 2: Fix project deep links and verify the result

**Files:** src/components/ProjectEntry.vue, src/components/ProjectGroups.vue; .github/workflows/deploy.yml.

- [x] Reproduce missing `#software-rasterizer` before editing. SectionBlock already renders section IDs, while ProjectEntry omits its typed project ID.
- [x] Add the target IDs and sticky-header spacing:

```vue
<article :id="project.id" class="project">
```

```css
.project { scroll-margin-top: calc(var(--nav-h) + 1rem); }
```

```vue
<section v-for="group in projectGroups" :id="group.id" :key="group.id" class="group">
```

- [x] Align CI Node with Vite 7 by replacing Node 18 with Node 22.
- [x] Format only touched files and run `npm run build` and `git diff --check`.
- [x] Verify desktop (1440×1000), mobile (390×844), tablet (768×1024): no horizontal overflow, rendered images, correct May 2027/full-time identity, publication links, distinct job periods, and all three deep-link targets.
- [x] Inspect desktop/mobile PNGs and check hash navigation scrolls to each target, not just updates the URL. Report local preview and actual verification, retaining deployment as a separate action.

## Verification results

- Type checking and Vite production build passed.
- Renderer deep-link target count was 0 before the fix and 1 afterwards.
- Fixed lazy-media layout shifts by reserving sizes in MediaFigure.vue from src/data/mediaDimensions.ts.
- Production preview passed at desktop 1440×1000, mobile 390×844, and tablet 768×1024: no horizontal overflow, no runtime errors, correct identity/dates/job periods/paper links, 24 local image routes returning 200, and three deep links landing below the sticky navigation.
- Desktop and mobile screenshots visually reviewed. No deployment or push performed.
