# Section Navigation Plan

**Goal:** Replace the single long portfolio page with independently navigable sections and quiet transition animation, preserving current content and project deep links. Local preview only; do not push or deploy.

**Architecture:** Use hash navigation so GitHub Pages needs no server rewrite and existing shared anchors remain compatible. Keep the profile sidebar mounted; render only the current section inside a Vue transition. Reuse the existing content components and carousel.

**Tech stack:** Vue 3, TypeScript, native hashchange/history navigation, CSS transitions, existing SSR/Node tests.

- [x] Add failing tests for section isolation and modern/legacy project URL resolution.
- [x] Add a navigation module defining valid sections, target ownership, canonical URLs, and back/forward-compatible hash state.
- [x] Render one section per route in App.vue; set the active sidebar entry, page title, scroll target, and keyboard focus after navigation.
- [x] Convert visible navigation and project links to canonical section routes; retain legacy anchor support.
- [x] Animate section entry/exit and sidebar feedback, honoring reduced-motion preferences.
- [x] Adapt existing resource/anchor/carousel checks to independently rendered sections, run tests and build, and verify the preview responds. No remote publication.

Verification: 8 tests passed; Vue/TypeScript and production build passed; preview returned HTTP 200. Independent review findings about incoming scroll positioning and repeated links were corrected and rechecked. Browser interaction/animation QA remains unverified because the browser tool denied access to the local preview. No push or deployment was performed.

