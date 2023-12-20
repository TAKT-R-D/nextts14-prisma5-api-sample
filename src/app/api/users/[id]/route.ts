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
  UserInclude as PrismaInclude,
  UserSelect as PrismaSelect,
} from '@/schemas/prismaQuery';
import { getPrismaFindUniqueQuery } from '@/lib/BuildPrismaQuery';

type Props = {
  params: {
    id: string;
  };
};

function _validateSlugParameters(id: number) {
  const result = WhereUniqueInputSchema.safeParse({ id });
  let data: any = { success: result.success };
  if (result.success === false) {
    const { errorCode, errorObject } = handleZodError(result.error);
    return { ...data, errors: errorObject, where: undefined };
  } else {
    return { ...data, errors: undefined, where: result.data };
  }
}

export async function GET(request: Request, { params: { id } }: Props) {
  let findQuery = await getPrismaFindUniqueQuery(PrismaSelect, PrismaInclude);
  const { success, errors, where } = _validateSlugParameters(+id);
  if (success === false) {
    return NextResponse.json({ errors }, { status: 400 });
  } else {
    findQuery = { ...findQuery, where };
  }

  // validate query
  const query = FindUniqueArgsSchema.safeParse(findQuery);
  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ errors: errorObject }, { status: errorCode });
  }

  let statusCode = 200;
  const res = await prisma.user
    .findUnique(query.data)
    .then((res) => {
      if (!res) {
        statusCode = 404;
        return { errors: { message: 'Not Found' } };
      }
      return res;
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return errorObject;
    });

  return NextResponse.json(res, { status: statusCode });
}

export async function PUT(request: Request, { params: { id } }: Props) {
  const { success, errors, where } = _validateSlugParameters(+id);
  if (success === false) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const requestBody: Partial<RequestType> = await request.json().catch(() => {
    return null;
  });

  if (!requestBody) {
    return NextResponse.json(
      { errors: { message: 'empty request' } },
      { status: 400 }
    );
  }

  const query = UpdateInputSchema.safeParse(requestBody);

  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ errors: errorObject }, { status: errorCode });
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
      return errorObject;
    });

  return NextResponse.json(res, { status: statusCode });
}

export async function DELETE(request: Request, { params: { id } }: Props) {
  const { success, errors, where } = _validateSlugParameters(+id);
  if (success === false) {
    return NextResponse.json({ errors }, { status: 400 });
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
      return errorObject;
    });

  if (statusCode === 204) {
    return new Response(null, { status: 204 });
  } else {
    return NextResponse.json(res, { status: statusCode });
  }
}
