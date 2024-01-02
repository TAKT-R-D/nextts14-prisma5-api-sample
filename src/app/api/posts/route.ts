export const dynamic = 'force-dynamic';
import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/Prisma';
import { getPrismaFindManyQuery } from '@/lib/BuildPrismaQuery';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';
import { handleZodError } from '@/lib/ZodErrorHandler';
import { ERROR_MAP } from '@/lib/ErrorMessages';
import {
  PostCreateInputSchema as CreateInputSchema,
  PostFindManyArgsSchema as FindManyArgsSchema,
  type Post as RequestType,
} from '@/schemas/zod';
import {
  PostPrismaInclude as PrismaInclude,
  PostPrismaSelect as PrismaSelect,
  formatPostParams,
} from '@/schemas/config';

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
    return NextResponse.json({ error: errorObject }, { status: errorCode });
  }

  let statusCode = 200;
  const res = await prisma.post
    .findMany(query.data)
    .then((res) => {
      if (!res) {
        statusCode = 404;
        return { error: ERROR_MAP[404] };
      } else {
        return res;
      }
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });
  const totalCount = await prisma.post.aggregate({ _count: true });

  return NextResponse.json(res, {
    headers: {
      'x-total-count': String(totalCount._count),
    },
    status: statusCode,
  });
}

export async function POST(request: Request) {
  const requestBody: Partial<RequestType> = await request
    .json()
    .catch(() => {});

  const params = formatPostParams(requestBody);
  const query = CreateInputSchema.safeParse(params);

  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ error: errorObject }, { status: errorCode });
  }

  let statusCode = 200;

  const res = await prisma.post
    .create({
      data: query.data,
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });

  return NextResponse.json(res, { status: statusCode });
}
