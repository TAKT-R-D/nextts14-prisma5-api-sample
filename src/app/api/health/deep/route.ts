import { NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';

// health check with database connection
export async function GET(request: Request) {
  let statusCode = 200;
  const res = await prisma.bookmark
    .findMany({ take: 1 })
    .then(() => {
      return {
        status: 'pass',
        message: 'success to connect database',
      };
    })
    .catch((err) => {
      const { errorObject } = handlePrismaError(err);
      statusCode = 503;
      return {
        status: 'fail',
        message: 'failed to connect database',
        details: errorObject,
      };
    });

  return NextResponse.json(res, {
    status: statusCode,
    headers: {
      'Content-Type': 'application/health+json',
    },
  });
}
