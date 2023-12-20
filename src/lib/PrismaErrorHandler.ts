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

export function handlePrismaError(err: any) {
  console.error(err);
  return { errorCode: err.statu | 500, errorObject: err.message };
  /*
    let id: string = uuidv4();
    let errors = {
        type: 'PrismaClientValidationError',
        id,
        ...err,
        message: err.message,
    };
    return { errorCode: 400, errorObject: errors };
    */
}
