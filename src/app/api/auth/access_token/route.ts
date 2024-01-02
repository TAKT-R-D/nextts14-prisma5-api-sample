export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { prisma } from '@/lib/Prisma';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';
import { handleZodError } from '@/lib/ZodErrorHandler';
import { AuthRequestSchema } from '@/schemas/config';
import { ERROR_MAP } from '@/lib/ErrorMessages';

const API_SECRET = process.env.API_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ISSUER = process.env.JWT_ISSUER || 'urn:example:issuer';
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'urn:example:audience';
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '1h';

type RequestType = {
  userId: string;
  secret: string;
};

export async function POST(request: Request) {
  const requestBody: RequestType = await request.json().catch(() => {});
  if (!requestBody) {
    return NextResponse.json({ error: ERROR_MAP[400] }, { status: 400 });
  }

  const query = AuthRequestSchema.safeParse(requestBody);

  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ errors: errorObject }, { status: errorCode });
  }

  let statusCode: number = 200;

  if (!API_SECRET || !JWT_SECRET) {
    statusCode = 500;
  } else if (query.data.secret !== API_SECRET) {
    console.error('Auth Error: access_token');
    console.error(requestBody);
    statusCode = 401;
  }

  if (statusCode !== 200) {
    return NextResponse.json(
      { error: ERROR_MAP[statusCode] },
      { status: statusCode }
    );
  }

  const user = await prisma.user
    .findUnique({ where: { id: query.data.userId } })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });

  if (!user) {
    return new Response(null, { status: 204 });
  } else if ('error' in user) {
    return NextResponse.json(user, { status: statusCode });
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
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .sign(secretKey);

  return NextResponse.json({
    access_token,
  });
}
