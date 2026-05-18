<!-- Solid -->
- Use Payload v3 patterns
- Use TypeScript only
- Prefer Globals for settings
- Prefer Blocks for page builder
- Use PostgreSQL
- Use Next.js App Router

<!-- Structure -->
- Keep collection configs in separate files under `src/collections/`
- Keep global configs in separate files under `src/globals/`
- Use named exports for all collection/global configs

<!-- Field Design -->
- Always add `admin.description` to non-obvious fields
- Use `access` control functions at field level for sensitive data
- Prefer `relationship` fields over storing raw IDs

<!-- Access Control -->
- Define access control functions in `src/access/`
- Authenticated users only by default; explicitly open public routes

<!-- Hooks -->
- Keep hooks in `src/hooks/`, one file per concern
- Prefer `afterChange` / `beforeChange` over direct DB calls

<!-- Next.js Integration -->
- Use `getPayload` from `payload` in Server Components only
- Never import `payload.config.ts` on the client side
- Fetch data via `payload.find()` / `payload.findByID()`, not REST fetch internally

<!-- Env & Security -->
- All secrets via environment variables, never hardcoded
- Define `PAYLOAD_SECRET`, `DATABASE_URI` in `.env.local`

<!-- Database -->
- Run migrations with `pnpm payload migrate:create` after schema changes
- Never edit generated migration files manually
- Commit migration files to version control

<!-- Blocks -->
- Keep block configs in `src/blocks/`, one file per block
- Each block must have a unique `slug`
- Always define a `BlockComponent` in the same folder for frontend rendering

<!-- Admin UI -->
- Always set `admin.useAsTitle` on every collection
- Group related collections with `admin.group`