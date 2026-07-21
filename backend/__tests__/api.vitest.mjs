// ═══════════════════════════════════════════════════════════════════
//   backend/__tests__/api.vitest.mjs
//   ───────────────────────────────────────────────────────────────
//   Actual HTTP-level tests via Supertest, driving requests straight
//   into the real Express app (no server needs to be listening).
//   Scoped to endpoints that don't require live Hedera testnet
//   credentials to exercise meaningfully -- health, error handling,
//   and the community-posts flow's validation logic, which is real
//   application logic independent of the network call.
// ═══════════════════════════════════════════════════════════════════

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server.mjs';

describe('GET /api/health', () => {
  it('responds with ok status and identifies the network mode', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('network');
  });
});

describe('GET /api/transfers/:id', () => {
  it('returns 404 for a transaction that does not exist', async () => {
    const res = await request(app).get('/api/transfers/TXN-DOES-NOT-EXIST');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/transfers/:id/community-code', () => {
  it('returns 404 for a nonexistent transaction', async () => {
    const res = await request(app).post('/api/transfers/TXN-DOES-NOT-EXIST/community-code');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/community/posts', () => {
  it('rejects a request with no code at all', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .send({ message: 'trying without a code' });
    expect(res.status).toBe(400);
  });

  it('rejects a syntactically valid but unrecognized code', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .send({ code: 'FAKE-0000-0000-0000', message: 'this should not be accepted' });
    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/not recognized/i);
  });

  it('rejects a message shorter than 5 characters even with a plausible code', async () => {
    const res = await request(app)
      .post('/api/community/posts')
      .send({ code: 'AAAA-BBBB-CCCC-DDDD', message: 'hi' });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/community/posts', () => {
  it('returns an array (the public feed), even when empty', async () => {
    const res = await request(app).get('/api/community/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
