import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { prisma } from '@/lib/Prisma';

const API_SECRET = process.env.API_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  const { secret, userId } = await request.json();

  let statusCode: number = 200;

  if (!API_SECRET || !JWT_SECRET) {
    statusCode = 500;
  } else if (!secret || !userId) {
    statusCode = 400;
  } else if (secret !== API_SECRET) {
    console.error('Auth Error: access_token');
    console.error(request.headers);
    console.error(request.body);
    statusCode = 401;
  }

  if (statusCode !== 200) {
    return new NextResponse(null, {
      status: statusCode,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  const user = await prisma.user
    .findUnique({ where: { id: userId } })
    .catch((err) => {
      console.error(err);
      // TODO: Prisma Error handling
      statusCode = err.status | 500;
      return { error: 'Failed to fetch' };
    });

  if (!user) {
    return new Response(null, { status: 204 });
  }
  if ('error' in user) {
    return new Response(null, { status: statusCode });
  }

  const secretKey = new TextEncoder().encode(JWT_SECRET!);
  const alg = 'HS256';

  const access_token = await new jose.SignJWT({
    userId: user.id,
    userName: user.userName,
    imageUrl: user.imageUrl,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('10h')
    .sign(secretKey);

  return NextResponse.json({
    access_token,
  });
}
