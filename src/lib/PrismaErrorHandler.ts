import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/Prisma';
import { ERROR_MAP } from './ErrorMessages';
import { type ErrorType } from '@/types';
/*
 * Prisma Errors
 * - PrismaClientKnownRequestError
 *     {code, meta, message, clientVersion}
 *     -> DEPENDS
 * - PrismaClientUnknownRequestError
 *     {message, clientVersion}
 *     -> INTERNAL SERVER ERROR 500, need to re-connect
 * - PrismaClientRustPanicError
 *     {message, clientVersion}
 *     -> INTERNAL SERVER ERROR 500, need to re-connect or re-boot
 * - PrismaClientInitializationError
 *     {errorCode, message, clientVersion}
 *     -> INTERNAL SERVER ERROR 500
 * - PrismaClientValidationError
 *     {message, clientVersion}
 *     -> BAD REQUEST 400
 */
// errorCode: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
// P1xxx: Common Errors
// P2xxx: Query Errors
// P3xxx: Migration Errors
// P4xxx: Migration Errors
// P5xxx: Proxy Error

function _getErrorStatus(errorCode: string): {
  statusCode: number;
  isReconnectRequired: boolean;
} {
  const errorSeries = +errorCode.slice(1, 1);
  return {
    statusCode: errorSeries === 2 ? 400 : 500,
    isReconnectRequired: errorSeries >= 2 && errorSeries <= 4 ? false : true,
  };
}

export function handlePrismaError(err: any) {
  console.error(err);

  let errorCode: number = 500;
  let forceReconnect: boolean = false;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const { statusCode, isReconnectRequired } = _getErrorStatus(err.code);
    errorCode = statusCode;
    forceReconnect = isReconnectRequired;
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    forceReconnect = true;
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    forceReconnect;
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode) {
      const { statusCode, isReconnectRequired } = _getErrorStatus(
        err.errorCode
      );
      errorCode = statusCode;
      forceReconnect = isReconnectRequired;
    } else {
      forceReconnect = true;
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    errorCode = 400;
  }

  if (forceReconnect) prisma.$disconnect();

  const errorObject: ErrorType = {
    ...ERROR_MAP[errorCode],
    errors: [
      { path: '', message: err.message ? err.message : 'unknown error' },
    ],
  };

  return { errorCode, errorObject };
}
