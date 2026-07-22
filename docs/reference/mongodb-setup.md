# Database: MongoDB + Prisma ORM

Business records (transfers, compliance records, community posts) are stored in MongoDB, accessed through Prisma ORM. Only a hash and pseudonymous metadata are ever anchored on Hedera; the records themselves live here.

## Version requirement

`package.json` pins `"prisma": "^6.19.3"` and `"@prisma/client": "^6.19.3"`. Prisma 7 does not yet support MongoDB as a provider, so this project stays on the 6.x line until that changes.

## Setup

1. Set `MONGO_URI` in your `.env` file. The connection string must include a database name (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/crossborder?appName=...`, the `crossborder` segment is the database name and cannot be left blank).
2. Generate the Prisma client:
   ```bash
   npm run db:generate
   ```
   This requires internet access to `binaries.prisma.sh` to download Prisma's query engine.
3. On Render: add `npm run db:generate` to the build command (Settings → Build Command), e.g. `npm install && npm run db:generate`. Add `MONGO_URI` under Environment Variables, not committed to git.

## Fallback behavior

If `MONGO_URI` isn't set, the Prisma client hasn't been generated, or a database operation fails at runtime, `backend/db/store.mjs` logs a warning and falls back to a local JSON file (`backend/db.json`) automatically rather than crashing. A misconfigured or temporarily unreachable database degrades gracefully instead of taking the API down.

## Security note

A MongoDB connection string is a live credential. If one is ever exposed (shared in a chat, an issue tracker, or committed by mistake), rotate that database user's password in MongoDB Atlas.
