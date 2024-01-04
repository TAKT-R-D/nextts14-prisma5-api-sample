import { NextResponse } from 'next/server';
import { getBearerAuthStatusCode } from './lib/BearerAuth';
import { ERROR_MAP } from './lib/ErrorMessages';

/*
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        'https://www.yoursite.com',
        'https://yoursite.com',
        'http://localhost:3000',
      ]
    : ['http://localhost:3000', 'https://www.google.com'];
*/

export async function middleware(request: Request) {
  // CORS, headers
  /*
  const origin = request.headers.get('origin');

  if ((origin && !allowedOrigins.includes(origin)) || !origin) {
    return NextResponse.json({ error: ERROR_MAP[400] }, { status: 400 });
    // MEMO: Next.js automatically returns 204 for OPTIONS requests if no error
  }
  */

  const newHeaders = new Headers(request.headers);
  // MEMO: Browsers check headers even after pre-flight requests passed
  //newHeaders.set('Access-Control-Allow-Origin', origin);
  newHeaders.set('Access-Control-Allow-Origin', '*');
  newHeaders.set(
    'Access-Control-Allow-Headers',
    'GET, POST, OPTIONS, DELETE, PUT'
  );
  newHeaders.set('X-FRAME-OPTIONS', 'DENY');
  newHeaders.set('Cache-Control', 'no-cache, no-store, max-age=0');

  // API VERSION
  newHeaders.set('X-API-VERSION', process.env.API_VERSION!);

  // Bearer Auth
  // MEMO: except /api/auth/*
  const regexAuth = new RegExp('/api/(auth|health)/*');
  if (!regexAuth.test(request.url)) {
    const bearerAuthStatusCode = await getBearerAuthStatusCode(request);
    if (bearerAuthStatusCode !== 200) {
      return NextResponse.json(
        { error: ERROR_MAP[bearerAuthStatusCode] },
        { status: bearerAuthStatusCode }
      );
    }
  }
  // session check, etc... if needed

  /*
  // admin api
  const regex = new RegExp('/api/cms/*');
  if (regex.test(request.url)) {
    console.log('admin');
  }
  */

  return NextResponse.next({
    headers: newHeaders,
    request: {
      headers: newHeaders,
    },
  });
}

export const config = {
  matcher: '/api/:path*',
};
