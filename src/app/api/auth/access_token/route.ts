import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { prisma } from '@/lib/Prisma';
import { AuthRequestSchema } from '@/schemas/config';
import { handleZodError } from '@/lib/ZodErrorHandler';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';

const API_SECRET = process.env.API_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

type RequestType = {
  userId: string;
  secret: string;
};

export async function POST(request: Request) {
  const requestBody: RequestType = await request.json().catch(() => {});
  if (!requestBody) {
    return NextResponse.json(
      { error: { message: 'empty request' } },
      { status: 400 }
    );
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

  // TODO: body
  if (statusCode !== 200) {
    return new NextResponse(null, {
      status: statusCode,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
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
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('10h')
    .sign(secretKey);

  return NextResponse.json({
    access_token,
  });
}
