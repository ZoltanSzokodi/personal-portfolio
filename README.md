# Nuxt portfolio prototype

A minimal portfolio template built with Nuxt 4, Vue 3, TypeScript, plain CSS, ESLint, and Prettier. It includes a home page, typed sample project data, reusable project cards, and statically generated case-study routes.

The project intentionally contains sample copy rather than a finished personal portfolio. Replace it with real work before publishing.

## Requirements

- Node.js 24 (`.nvmrc` is included)
- npm 11

## Run locally

```bash
nvm use
npm install
npm run dev -- --open
```

Nuxt opens the prototype at `http://localhost:3000` and updates the page as files change.

## Customize the template

- Update your name, location, and contact links in `shared/data/site.ts`.
- Replace the clearly labeled sample projects in `shared/data/projects.ts`.
- Adjust design tokens and global rules in `app/assets/css/main.css`.
- Add real screenshots under `public/images/` and render them with `NuxtImg` when needed.

The home page is in `app/pages/index.vue`. The `app/pages/projects/[slug].vue` route renders every project from the shared data file and returns a 404 for unknown slugs.

## Quality checks

```bash
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run generate
```

## GitHub Pages

`.github/workflows/deploy.yml` checks and deploys the statically generated site after a push to `main`. After creating your repository, enable GitHub Pages and select **GitHub Actions** as its source. The workflow derives the correct repository base path automatically.

Git initialization, repository creation, commits, remotes, and pushes are intentionally left to you.
