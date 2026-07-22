# Database: MongoDB + Prisma ORM

This replaces the earlier local `db.json` file with real MongoDB persistence via Prisma, matching what this project's own report claims (Technology Stack table: "Database: PostgreSQL + Prisma ORM"; the actual code before this change was a local JSON file). MongoDB, not PostgreSQL, since Prisma supports both and this project's data (transactions, community posts) is naturally document-shaped, and it's what was already provisioned for this project (a free MongoDB Atlas cluster).

## Important: Prisma version is pinned to 6.x, not 7

`package.json` pins `"prisma": "^6.19.3"` and `"@prisma/client": "^6.19.3"` deliberately. **Prisma 7 does not support MongoDB yet** (confirmed directly from Prisma's own upgrade documentation: "Support for MongoDB is limited to Prisma 6 as of now... we're working on support for MongoDB in v7"). A first deploy attempt installed Prisma 7 (the default "latest" when nothing was pinned) and failed on Render with `P1012: The datasource property 'url' is no longer supported in schema files`, which reads like a syntax error but is actually a missing-feature error. Don't upgrade past 6.x until Prisma officially ships MongoDB support in 7.

## What actually changed

- `prisma/schema.prisma`: real schema for `Transaction` and `CommunityPost`, `provider = "mongodb"`.
- `backend/db/store.mjs`: a thin data-access layer. `readDb()` and `writeDb(data)` keep the exact same shape the rest of `server.mjs` already expected (`{ transactions: {...}, communityPosts: [...] }`), so this didn't require rewriting every route individually.
- Nothing about Hedera anchoring changed. Only a hash and pseudonymous metadata are ever anchored on-chain, regardless of where the off-chain record itself lives.

## Setup (do this once)

1. Set `MONGO_URI` in your `.env` file (a real MongoDB Atlas connection string, `mongodb+srv://user:pass@cluster.mongodb.net/?appName=...`).
2. Generate the Prisma client:
   ```bash
   npm run db:generate
   ```
   This needs real internet access to `binaries.prisma.sh` to download Prisma's query engine. It could not be run in the sandbox this feature was built in (that sandbox's network is restricted to a small allowlist that doesn't include Prisma's CDN); run it on your own machine, or as part of your deploy platform's build command (see below).
3. On Render specifically: add `npm run db:generate` to the build command (Render's dashboard → your service → Settings → Build Command), e.g. `npm install && npm run db:generate`. Also add `MONGO_URI` under Environment Variables there, the same value as your local `.env`, not committed to git.

## Honest fallback behavior

If `MONGO_URI` isn't set, or the Prisma client hasn't been generated yet, `backend/db/store.mjs` logs a clear warning and falls back to the local `db.json` file automatically, rather than crashing the server. This was deliberate: it's what let this feature's own test suite keep passing in a sandbox that couldn't reach Prisma's binary CDN, and it means a misconfigured `MONGO_URI` degrades gracefully instead of taking the whole API down.

**This has not yet been confirmed against a live MongoDB connection** (the same network restriction above). Run `npm run db:generate` yourself, restart the server, and check the startup logs. If you don't see the "Prisma client is not available" warning, it's connected.

## Security note

If a real MongoDB connection string with a real password is ever pasted into a chat, an issue tracker, or committed to git by mistake, rotate that database user's password in MongoDB Atlas afterward. A connection string is a live credential, not just configuration.
