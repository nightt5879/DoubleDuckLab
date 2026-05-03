const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const OAUTH_STATE_COOKIE = 'ddlab_oauth_state';

function randomHex(bytes) {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (value) => value.toString(16).padStart(2, '0')).join('');
}

function isPrivateRepo(env) {
  return Boolean(env.GITHUB_REPO_PRIVATE && env.GITHUB_REPO_PRIVATE !== '0');
}

function missingSecrets(env) {
  return ['GITHUB_OAUTH_ID', 'GITHUB_OAUTH_SECRET'].filter((key) => !env[key]);
}

function callbackUrl(url) {
  return `${url.origin}/callback?provider=github`;
}

function authProvider(url) {
  return url.searchParams.get('provider') || 'github';
}

function allowedOrigin(env) {
  return env.ALLOWED_ORIGIN || '*';
}

function parseCookies(header) {
  return Object.fromEntries(
    (header || '')
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf('=');
        if (index === -1) {
          return [part, ''];
        }

        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      }),
  );
}

function stateCookie(value, maxAge = 600) {
  return [
    `${OAUTH_STATE_COOKIE}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ].join('; ');
}

function clearStateCookie() {
  return stateCookie('', 0);
}

function textResponse(body, init = {}) {
  return new Response(body, {
    ...init,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      ...(init.headers || {}),
    },
  });
}

function renderCallbackPage(env, status, payload) {
  const targetOrigin = allowedOrigin(env);
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Authorizing Decap CMS</title>
  </head>
  <body>
    <p>Authorizing Decap CMS...</p>
    <script>
      const targetOrigin = ${JSON.stringify(targetOrigin)};
      const authMessage = ${JSON.stringify(message)};

      function receiveMessage(event) {
        if (targetOrigin !== '*' && event.origin !== targetOrigin) {
          return;
        }

        window.opener.postMessage(authMessage, targetOrigin);
        window.removeEventListener('message', receiveMessage, false);
      }

      if (window.opener) {
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', targetOrigin);
      }
    </script>
  </body>
</html>
`,
    {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
      },
    },
  );
}

async function handleAuth(request, env) {
  const url = new URL(request.url);

  if (authProvider(url) !== 'github') {
    return textResponse('Invalid provider', { status: 400 });
  }

  const missing = missingSecrets(env);
  if (missing.length > 0) {
    return textResponse(`Missing Worker secrets: ${missing.join(', ')}`, { status: 500 });
  }

  const redirect = new URL(GITHUB_AUTHORIZE_URL);
  redirect.searchParams.set('response_type', 'code');
  redirect.searchParams.set('client_id', env.GITHUB_OAUTH_ID);
  redirect.searchParams.set('redirect_uri', callbackUrl(url));
  redirect.searchParams.set('scope', isPrivateRepo(env) ? 'repo,user' : 'public_repo,user');
  const state = randomHex(16);
  redirect.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      location: redirect.toString(),
      'set-cookie': stateCookie(state),
      'cache-control': 'no-store',
    },
  });
}

async function exchangeCode(url, env, code) {
  const body = new URLSearchParams({
    client_id: env.GITHUB_OAUTH_ID,
    client_secret: env.GITHUB_OAUTH_SECRET,
    code,
    redirect_uri: callbackUrl(url),
  });

  const response = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const result = await response.json();

  if (!response.ok || !result.access_token) {
    const error = result.error || `github_token_${response.status}`;
    const description = result.error_description || 'GitHub did not return an access token.';
    throw new Error(`${error}: ${description}`);
  }

  return result.access_token;
}

async function handleCallback(request, env) {
  const url = new URL(request.url);

  if (authProvider(url) !== 'github') {
    return textResponse('Invalid provider', { status: 400 });
  }

  if (url.searchParams.has('error')) {
    const response = renderCallbackPage(env, 'error', {
      error: url.searchParams.get('error'),
      error_description: url.searchParams.get('error_description') || 'GitHub OAuth authorization failed.',
    });
    response.headers.append('set-cookie', clearStateCookie());
    return response;
  }

  const code = url.searchParams.get('code');
  if (!code) {
    return textResponse('Missing code', { status: 400 });
  }

  const returnedState = url.searchParams.get('state');
  const expectedState = parseCookies(request.headers.get('cookie'))[OAUTH_STATE_COOKIE];

  if (!returnedState || !expectedState || returnedState !== expectedState) {
    return textResponse('Invalid OAuth state', {
      status: 400,
      headers: {
        'set-cookie': clearStateCookie(),
        'cache-control': 'no-store',
      },
    });
  }

  try {
    const token = await exchangeCode(url, env, code);
    const response = renderCallbackPage(env, 'success', { token });
    response.headers.append('set-cookie', clearStateCookie());
    return response;
  } catch (error) {
    const response = renderCallbackPage(env, 'error', {
      error: 'oauth_exchange_failed',
      error_description: error instanceof Error ? error.message : 'OAuth token exchange failed.',
    });
    response.headers.append('set-cookie', clearStateCookie());
    return response;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      return textResponse('DoubleDuckLab Decap CMS OAuth proxy OK');
    }

    if (url.pathname === '/auth') {
      return handleAuth(request, env);
    }

    if (url.pathname === '/callback') {
      return handleCallback(request, env);
    }

    return textResponse('Not found', { status: 404 });
  },
};
