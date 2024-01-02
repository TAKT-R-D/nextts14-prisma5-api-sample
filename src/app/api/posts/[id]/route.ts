export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getPrismaFindUniqueQuery } from '@/lib/BuildPrismaQuery';
import { ERROR_MAP } from '@/lib/ErrorMessages';
import { prisma } from '@/lib/Prisma';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';
import { validateSlugParameters } from '@/lib/SchemaValidator';
import { handleZodError } from '@/lib/ZodErrorHandler';
import {
  PostFindUniqueArgsSchema as FindUniqueArgsSchema,
  PostUpdateInputSchema as UpdateInputSchema,
  PostWhereUniqueInputSchema as WhereUniqueInputSchema,
  type Post as RequestType,
} from '@/schemas/zod';
import {
  PostPrismaInclude as PrismaInclude,
  PostPrismaSelect as PrismaSelect,
  formatPostParams,
} from '@/schemas/config';

type Props = {
  params: {
    id: string;
  };
};

async function _validateSlugParameters(id: string) {
  return await validateSlugParameters(WhereUniqueInputSchema, +id);
}

export async function GET(request: Request, { params: { id } }: Props) {
  let findQuery = await getPrismaFindUniqueQuery(PrismaSelect, PrismaInclude);
  const { success, error, where } = await _validateSlugParameters(id);
  if (success === false) {
    return NextResponse.json({ error }, { status: 400 });
  } else {
    findQuery = { ...findQuery, where };
  }

  // validate query
  const query = FindUniqueArgsSchema.safeParse(findQuery);
  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json(
      { ...ERROR_MAP[errorCode], errors: errorObject },
      { status: errorCode }
    );
  }

  let statusCode = 200;
  const res = await prisma.post
    .findUnique(query.data)
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

  return NextResponse.json(res, { status: statusCode });
}

export async function PUT(request: Request, { params: { id } }: Props) {
  const { success, error, where } = await _validateSlugParameters(id);
  if (success === false) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const requestBody: Partial<RequestType> = await request
    .json()
    .catch(() => {});

  const params = formatPostParams(requestBody);
  const query = UpdateInputSchema.safeParse(params);

  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ error: errorObject }, { status: errorCode });
  }

  let statusCode = 200;

  const res = await prisma.post
    .update({
      where,
      data: query.data,
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });

  return NextResponse.json(res, { status: statusCode });
}

export async function DELETE(request: Request, { params: { id } }: Props) {
  const { success, error, where } = await _validateSlugParameters(id);
  if (success === false) {
    return NextResponse.json({ error }, { status: 400 });
  }

  let statusCode = 204;

  const res = await prisma.post
    .delete({
      where,
    })
    .then(() => {
      return null;
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });

  if (statusCode === 204) {
    return new Response(null, { status: 204 });
  } else {
    return NextResponse.json(res, { status: statusCode });
  }
}
