import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ISSUER = process.env.JWT_ISSUER || 'urn:example:issuer';
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'urn:example:audience';

export async function getBearerAuthStatusCode(
  request: Request
): Promise<number> {
  const authHeader = request.headers.get('Authorization');

  // no Authorization header starts with Bearer (406: unauthenticated)
  if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') {
    console.error('Auth Error');
    console.error(request.headers);
    return 401;
  }

  // can't find SECRET (500: Internal Server Error)
  if (!JWT_SECRET) return 500;

  // validate jwt
  let bearerAuthStatusCode: number = 500; // init as unknown error

  const secretKey = new TextEncoder().encode(JWT_SECRET);
  await jose
    .jwtVerify(authHeader.split(' ')[1], secretKey, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    })
    //.then(({ payload, protectedHeader }) => {
    .then(() => {
      bearerAuthStatusCode = 200;
    })
    .catch((err) => {
      console.error(err);
      bearerAuthStatusCode = 401;
    });

  return bearerAuthStatusCode;
}
