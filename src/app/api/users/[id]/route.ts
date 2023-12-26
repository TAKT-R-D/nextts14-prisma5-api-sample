import { NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';
import { handleZodError } from '@/lib/ZodErrorHandler';
import {
  UserFindUniqueArgsSchema as FindUniqueArgsSchema,
  UserUpdateInputSchema as UpdateInputSchema,
  UserWhereUniqueInputSchema as WhereUniqueInputSchema,
  type User as RequestType,
} from '@/schemas/zod';
import {
  UserPrismaInclude as PrismaInclude,
  UserPrismaSelect as PrismaSelect,
} from '@/schemas/config';
import { getPrismaFindUniqueQuery } from '@/lib/BuildPrismaQuery';
import { ERROR_MAP } from '@/lib/ErrorMessages';

type Props = {
  params: {
    id: string;
  };
};

function _validateSlugParameters(id: string) {
  const result = WhereUniqueInputSchema.safeParse({ id });
  let data: any = { success: result.success };
  if (result.success === false) {
    const { errorCode, errorObject } = handleZodError(result.error);
    return { ...data, error: errorObject, where: undefined };
  } else {
    return { ...data, error: undefined, where: result.data };
  }
}

export async function GET(request: Request, { params: { id } }: Props) {
  let findQuery = await getPrismaFindUniqueQuery(PrismaSelect, PrismaInclude);
  const { success, error, where } = _validateSlugParameters(id);
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
  const res = await prisma.user
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
  const { success, error, where } = _validateSlugParameters(id);
  if (success === false) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const requestBody: Partial<RequestType> = await request
    .json()
    .catch(() => {});

  const query = UpdateInputSchema.safeParse(requestBody);

  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ error: errorObject }, { status: errorCode });
  }

  let statusCode = 200;

  const res = await prisma.user
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
  const { success, error, where } = _validateSlugParameters(id);
  if (success === false) {
    return NextResponse.json({ error }, { status: 400 });
  }

  let statusCode = 204;

  const res = await prisma.user
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
