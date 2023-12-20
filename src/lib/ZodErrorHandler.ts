import { ZodError } from 'zod';

export function handleZodError(err: ZodError) {
  console.error(err);
  return { errorCode: 400, errorObject: err.errors };
  /*
  const errors = err.errors.map((error) => {
    return {
      code: error.code,
      message: error.message,
      path: error.path,
    };
  });
  return errors;
  */
}
