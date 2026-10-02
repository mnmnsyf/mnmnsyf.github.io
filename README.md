# Yongfei She — Personal Portfolio

Vue 3 + TypeScript + Vite 7. Public site: https://mnmnsyf.github.io/.

## Branches

- `codex/sde-portfolio-update`: maintained Vue source, content and media.
- `main`: compiled website served by GitHub Pages.
- `master`: previous published version, retained in history.

GitHub Pages uses **Deploy from a branch → main → / (root)**.

## Local development

Use Node.js 22.12 or newer. Work from the source branch:

```sh
git checkout codex/sde-portfolio-update
npm ci
npm run dev
```

Production checks and preview:

```sh
npm run build
npm run preview
```

The build runs both Vue/TypeScript checking and Vite compilation.

## Updating content

Content lives in `src/data/`:

- `site.ts`: identity, recruiting information, featured work and navigation.
- `publications.ts`: ArticulateArena, contribution statement, links and authors.
- `experience.ts`, `education.ts`, `news.ts`: timeline and dates.
- `projects.ts`, `skills.ts`, `awards.ts`: engineering evidence and skills.
- `mediaDimensions.ts`: intrinsic image/poster sizes to prevent layout shifts.

Media lives in `public/`. Project IDs are URL anchors such as
`#software-rasterizer`, `#engine-subsystems` and `#articulatearena`.

Keep these facts consistent across the site and application materials:

- Full-time search: 2027; expected USC graduation: May 2027.
- ArticulateArena: second author, arXiv preprint dated September 27, 2026.
- Digital Sky internship: September 2023–July 2024; full-time: July 2024–December 2025.

## Publishing

Commit content changes on the source branch and push:

```sh
git add <changed-files>
git commit -m "Update portfolio"
git push origin codex/sde-portfolio-update
```

The workflow in `.github/workflows/deploy.yml` installs dependencies, builds
`dist`, publishes that output to **main**, and explicitly requests a Pages build.
It uses the repository-scoped `GITHUB_TOKEN` with `contents: write` and
`pages: write`; a separate `DEPLOY_TOKEN` secret is not needed.

Review both the source deployment workflow and the Pages build before considering
a release complete. Verify the public site title, publication links, dates,
images, mobile layout and project anchors after deployment.

Local reference material and preview screenshots under `参考/` are ignored by Git.
