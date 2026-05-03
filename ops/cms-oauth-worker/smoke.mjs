import assert from 'node:assert/strict';
import worker from './src/index.js';

const env = {
  ALLOWED_ORIGIN: 'https://doubleducklab.pages.dev',
  GITHUB_REPO_PRIVATE: '0',
  GITHUB_OAUTH_ID: 'test-client-id',
  GITHUB_OAUTH_SECRET: 'test-client-secret',
};

const originalFetch = globalThis.fetch;
let tokenExchangeCount = 0;

globalThis.fetch = async (url, init) => {
  tokenExchangeCount += 1;
  assert.equal(url, 'https://github.com/login/oauth/access_token');
  assert.equal(init?.method, 'POST');

  return new Response(JSON.stringify({ access_token: 'test-access-token' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

try {
  const health = await worker.fetch(new Request('https://oauth.example/'), env);
  assert.equal(health.status, 200);
  assert.equal(await health.text(), 'DoubleDuckLab Decap CMS OAuth proxy OK');

  const auth = await worker.fetch(new Request('https://oauth.example/auth?provider=github'), env);
  assert.equal(auth.status, 302);

  const location = new URL(auth.headers.get('location'));
  const state = location.searchParams.get('state');
  const setCookie = auth.headers.get('set-cookie');
  assert.equal(location.origin, 'https://github.com');
  assert.equal(location.pathname, '/login/oauth/authorize');
  assert.equal(location.searchParams.get('client_id'), 'test-client-id');
  assert.equal(location.searchParams.get('redirect_uri'), 'https://oauth.example/callback');
  assert.equal(location.searchParams.get('scope'), 'public_repo,user');
  assert.ok(state);
  assert.ok(setCookie.includes(`ddlab_oauth_state=${state}`));
  assert.ok(setCookie.includes('HttpOnly'));
  assert.ok(setCookie.includes('Secure'));
  assert.ok(setCookie.includes('SameSite=Lax'));

  const callbackWithoutProvider = await worker.fetch(
    new Request(`https://oauth.example/callback?code=abc&state=${state}`, {
      headers: { cookie: setCookie },
    }),
    env,
  );
  assert.equal(callbackWithoutProvider.status, 200);
  assert.match(await callbackWithoutProvider.text(), /authorization:github:success/);
  assert.match(callbackWithoutProvider.headers.get('set-cookie'), /ddlab_oauth_state=.*Max-Age=0/);
  assert.equal(tokenExchangeCount, 1);

  const invalidState = await worker.fetch(
    new Request('https://oauth.example/callback?provider=github&code=abc&state=wrong', {
      headers: { cookie: setCookie },
    }),
    env,
  );
  assert.equal(invalidState.status, 400);
  assert.equal(await invalidState.text(), 'Invalid OAuth state');
  assert.equal(tokenExchangeCount, 1);

  const validState = await worker.fetch(
    new Request(`https://oauth.example/callback?provider=github&code=abc&state=${state}`, {
      headers: { cookie: setCookie },
    }),
    env,
  );
  assert.equal(validState.status, 200);
  assert.match(await validState.text(), /authorization:github:success/);
  assert.match(validState.headers.get('set-cookie'), /ddlab_oauth_state=.*Max-Age=0/);
  assert.equal(tokenExchangeCount, 2);

  console.log('CMS OAuth Worker smoke checks passed');
} finally {
  globalThis.fetch = originalFetch;
}
