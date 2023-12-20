import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/Prisma';
import { getPrismaFindManyQuery } from '@/lib/BuildPrismaQuery';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';
import { handleZodError } from '@/lib/ZodErrorHandler';
import {
  UserCreateInputSchema as CreateInputSchema,
  UserFindManyArgsSchema as FindManyArgsSchema,
  type User as RequestType,
} from '@/schemas/zod';
import {
  UserInclude as PrismaInclude,
  UserSelect as PrismaSelect,
} from '@/schemas/prismaQuery';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const findQuery = await getPrismaFindManyQuery(
    PrismaSelect,
    PrismaInclude,
    searchParams
  );

  // validate query
  const query = FindManyArgsSchema.safeParse(findQuery);
  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ errors: errorObject }, { status: errorCode });
  }

  let statusCode = 200;
  const res = await prisma.user.findMany(query.data).catch((err) => {
    const { errorCode, errorObject } = handlePrismaError(err);
    statusCode = errorCode;
    return errorObject;
  });
  const totalCount = await prisma.user.aggregate({ _count: true });

  return NextResponse.json(res, {
    headers: {
      'x-total-count': String(totalCount._count),
    },
    status: statusCode,
  });
}

export async function POST(request: Request) {
  const requestBody: Partial<RequestType> = await request.json().catch(() => {
    return null;
  });

  if (!requestBody) {
    return NextResponse.json(
      { errors: { message: 'empty request' } },
      { status: 400 }
    );
  }

  const query = CreateInputSchema.safeParse(requestBody);

  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ errors: errorObject }, { status: errorCode });
  }

  let statusCode = 200;

  const res = await prisma.user
    .create({
      data: query.data,
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return errorObject;
    });

  return NextResponse.json(res, { status: statusCode });
}
