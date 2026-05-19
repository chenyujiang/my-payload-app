# AGENTS.md

## Project Overview

This repository is a Payload CMS 3 website template application named `my-payload-app`.
It combines Payload Admin, Payload APIs, and a public Next.js App Router frontend in one
TypeScript project.

The app is based on the official Payload Website Template, with local customization for
site branding. The main stack is:

- Payload CMS `3.84.1`
- Next.js `16.2.6`
- React `19.2.6`
- TypeScript `5.7.3`
- PostgreSQL via `@payloadcms/db-postgres`
- Tailwind CSS with shadcn-style UI primitives
- Vitest for integration tests
- Playwright for end-to-end tests

## Important Commands

Use `pnpm` for this project.

- `pnpm dev` starts the Next/Payload development server.
- `pnpm build` builds the production app.
- `pnpm start` serves the built app.
- `pnpm lint` runs ESLint.
- `pnpm lint:fix` runs ESLint with automatic fixes.
- `pnpm generate:types` regenerates `src/payload-types.ts`.
- `pnpm generate:importmap` regenerates the Payload admin import map.
- `pnpm payload migrate:create` creates a database migration after schema changes.
- `pnpm payload migrate` runs pending migrations.
- `pnpm test:int` runs Vitest integration tests in `tests/int`.
- `pnpm test:e2e` runs Playwright tests in `tests/e2e`.
- `pnpm test` runs integration tests and then e2e tests.

## Environment

Payload reads secrets and URLs from environment variables.

Required or commonly used variables include:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- `CRON_SECRET`
- `PREVIEW_SECRET`

The active Payload config uses PostgreSQL through `DATABASE_URL`. Note that
`.env.example` and `docker-compose.yml` still include MongoDB-oriented defaults from
the template, so treat them carefully before using Docker or copying env values.

## Repository Structure

- `src/payload.config.ts` is the central Payload configuration.
- `src/collections/` contains Payload collections.
- `src/Header/`, `src/Footer/`, and `src/Branding/` contain Payload globals and their frontend/admin pieces.
- `src/blocks/` contains page-builder block configs and React renderers.
- `src/heros/` contains hero field config and hero renderers.
- `src/fields/` contains reusable Payload field builders.
- `src/access/` contains shared access-control helpers.
- `src/hooks/` contains shared Payload hooks.
- `src/plugins/index.ts` configures Payload plugins.
- `src/app/(frontend)/` contains public Next.js routes.
- `src/app/(payload)/` contains Payload admin and API routes.
- `src/components/` contains shared frontend/admin UI components.
- `src/utilities/` contains shared helpers for URLs, metadata, documents, media, formatting, etc.
- `tests/int/` contains Vitest integration tests.
- `tests/e2e/` contains Playwright browser tests.

## Payload Configuration

The Payload config is in `src/payload.config.ts`.

Key settings:

- Admin user collection: `users`
- Editor: shared Lexical config from `src/fields/defaultLexical.ts`
- Database: PostgreSQL adapter using `process.env.DATABASE_URL`
- Collections: `pages`, `posts`, `media`, `categories`, `users`
- Globals: `branding`, `header`, `footer`
- Plugins: redirects, nested docs, SEO, form builder, and search
- Type output: `src/payload-types.ts`
- CORS: based on `getServerSideURL()`
- Jobs access: authenticated users or requests with `Authorization: Bearer ${CRON_SECRET}`

Payload admin customizations include:

- `BeforeLogin`
- `BeforeDashboard`
- custom admin logo/icon from `src/Branding`
- favicon from `/brand/favicon`
- live preview breakpoints for mobile, tablet, and desktop

## Collections

### `pages`

Defined in `src/collections/Pages/index.ts`.

- Public reads are limited to published documents unless authenticated.
- Authenticated users can create, update, and delete.
- Uses drafts, autosave, scheduled publishing, and up to 50 versions per document.
- Has `title`, `hero`, `layout`, `meta`, `publishedAt`, and generated slug fields.
- Layout blocks: Call To Action, Content, Media, Archive, and Form.
- Uses SEO plugin fields.
- Revalidates frontend pages after change/delete.
- Uses `populatePublishedAt` before change.

### `posts`

Defined in `src/collections/Posts/index.ts`.

- Public reads are limited to published documents unless authenticated.
- Authenticated users can create, update, and delete.
- Uses drafts, autosave, scheduled publishing, and up to 50 versions per document.
- Has `title`, `heroImage`, rich text `content`, related posts, categories, SEO metadata,
  `publishedAt`, authors, populated author data, and generated slug fields.
- Rich text supports headings, blocks, fixed toolbar, inline toolbar, and horizontal rules.
- Rich text blocks: Banner, Code, and Media.
- Revalidates frontend posts after change/delete.
- Populates author data after read.

### `media`

Defined in `src/collections/Media.ts`.

- Publicly readable.
- Authenticated users can create, update, and delete.
- Uploads are stored under `public/media`.
- Folders are enabled.
- Supports focal point and generated image sizes: `thumbnail`, `square`, `small`, `medium`,
  `large`, `xlarge`, and `og`.
- Fields include `alt` and rich text `caption`.

### `categories`

Defined in `src/collections/Categories.ts`.

- Publicly readable.
- Authenticated users can create, update, and delete.
- Fields include `title` and generated slug.
- Used by posts.
- Nested category URLs are generated by the nested docs plugin.

### `users`

Defined in `src/collections/Users/index.ts`.

- Auth-enabled collection.
- Access is restricted to authenticated users.
- Admin title is `name`.
- Fields include `name`; Payload auth adds email/password behavior.

## Globals

### `branding`

Defined in `src/Branding/config.ts`.

- Publicly readable.
- Admin group: `Settings`.
- Fields: `brandName`, `logo`, `darkModeLogo`, and `favicon`.
- Used by frontend branding, admin graphics, and favicon routes.
- Revalidates branding-dependent frontend paths after change.

### `header`

Defined in `src/Header/config.ts`.

- Publicly readable.
- Contains up to 6 navigation items using the reusable `link` field.
- Revalidates the frontend header after change.

### `footer`

Defined in `src/Footer/config.ts`.

- Publicly readable.
- Contains up to 6 navigation items using the reusable `link` field.
- Revalidates the frontend footer after change.

## Plugins

Configured in `src/plugins/index.ts`.

- `redirectsPlugin` for page/post redirects, with revalidation on redirect changes.
- `nestedDocsPlugin` for nested `categories`.
- `seoPlugin` with generated titles and URLs.
- `formBuilderPlugin` with payment disabled and customized confirmation-message editor.
- `searchPlugin` for `posts`, with custom fields and a `beforeSync` hook.

Generated SEO titles currently use `Payload Website Template` as the site name.

## Frontend Routing

The public frontend lives under `src/app/(frontend)`.

- `/` reuses the dynamic page template and defaults to the `home` page slug.
- `/[slug]` renders Payload `pages`.
- `/posts` renders a paginated posts archive.
- `/posts/page/[pageNumber]` renders additional archive pages.
- `/posts/[slug]` renders individual posts.
- `/search` renders search UI.
- `/next/preview`, `/next/exit-preview`, and `/next/seed` support preview and seeding flows.
- Sitemap routes exist for pages and posts.
- Branding favicon routes exist at `/brand/favicon` and through Payload admin metadata.

Page and post routes use `getPayload({ config })` in server components, query Payload directly,
support draft mode, and render `LivePreviewListener` when draft mode is enabled.

## Rendering Model

Page layouts use Payload blocks.

`src/blocks/RenderBlocks.tsx` maps block types to React components:

- `archive` -> `ArchiveBlock`
- `content` -> `ContentBlock`
- `cta` -> `CallToActionBlock`
- `formBlock` -> `FormBlock`
- `mediaBlock` -> `MediaBlock`

Hero rendering is handled by `src/heros/RenderHero.tsx`, with concrete hero components under
`src/heros/`.

Post bodies render Lexical rich text through `src/components/RichText`.

## Access Control

Shared access helpers live in `src/access`.

- `authenticated` returns true when `req.user` exists.
- `authenticatedOrPublished` allows authenticated users or published documents.
- `anyone` allows public access.

The project rules say authenticated users should be the default and public routes should be
explicitly opened. Continue using shared access helpers instead of inline one-off logic where
possible.

## Revalidation And Preview

Pages, posts, header, footer, branding, and redirects have revalidation hooks.

Preview URLs are generated through `src/utilities/generatePreviewPath.ts`.
Frontend metadata is generated through `src/utilities/generateMeta.ts`.
Server URL helpers live in `src/utilities/getURL.ts`.

When changing content schema or preview behavior, check both the collection/global config and the
corresponding frontend route.

## Generated Files

Do not manually edit generated files unless there is a very specific reason.

- `src/payload-types.ts` is generated by Payload.
- `src/app/(payload)/admin/importMap.js` is generated by Payload.
- `src/app/(payload)/layout.tsx` is marked as generated by Payload.

After changing collections, globals, fields, blocks, admin components, or Payload config, consider
running `pnpm generate:types` and `pnpm generate:importmap`.

## Testing Notes

Vitest:

- Config: `vitest.config.mts`
- Test environment: `jsdom`
- Test files: `tests/int/**/*.int.spec.ts`
- Current integration test initializes Payload and fetches `users`.

Playwright:

- Config: `playwright.config.ts`
- Test directory: `tests/e2e`
- Browser project: Chromium
- Web server command: `pnpm dev`
- Base URL expected by tests: `http://localhost:3000`
- Admin tests seed and clean up a test user with email `dev@payloadcms.com`.

## Development Guidelines From This Repo

Follow `PROJECT_RULES.md` when making changes:

- Use Payload v3 patterns.
- Use TypeScript only.
- Prefer Globals for settings.
- Prefer Blocks for page-builder content.
- Use PostgreSQL and Next.js App Router.
- Keep collection configs under `src/collections/`.
- Keep global configs in their domain folders or under the existing global structure.
- Use named exports for collection/global configs.
- Put shared access-control helpers in `src/access/`.
- Put shared hooks in `src/hooks/` or collection/global-specific hooks beside their domain.
- Use `getPayload` in server components only.
- Do not import `payload.config.ts` on the client side.
- Fetch internal data through the Payload Local API, not internal REST calls.
- Keep secrets in environment variables.
- Run migrations after schema changes.
- Keep block configs in `src/blocks/`, one block per folder.
- Each block must have a unique `slug` and a frontend component.
- Set `admin.useAsTitle` on collections where applicable.

## Known Mismatches To Watch

- `PROJECT_RULES.md` mentions `src/globals/`, but this repository currently keeps globals in
  domain folders: `src/Header`, `src/Footer`, and `src/Branding`.
- `PROJECT_RULES.md` mentions `.env.local`, while this repository currently has `.env` and
  `.env.example`.
- `.env.example` and `docker-compose.yml` still show MongoDB defaults, while the actual Payload
  config uses PostgreSQL.
- `README.md` is mostly the upstream Payload template README and may describe generic template
  behavior that should be verified against the current source before relying on it.

## Practical Advice For Future Agents

- Start with `src/payload.config.ts` to understand any Payload change.
- For content-model work, inspect the collection/global config, hooks, generated types, frontend
  route, and block renderer together.
- Preserve user changes in the worktree; `AGENTS.md` was added as an untracked file during this
  documentation pass.
- Prefer small, schema-aware changes and regenerate Payload artifacts when the schema changes.
- Be careful with seed operations: the template seed flow is destructive.
