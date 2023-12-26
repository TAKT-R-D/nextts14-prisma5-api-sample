import { ZodError } from 'zod';
import { ERROR_MAP } from './ErrorMessages';
import { type ErrorType } from '@/types';

export function handleZodError(err: ZodError): {
  errorCode: number;
  errorObject: ErrorType;
} {
  console.error(err);
  const errors = err.errors.map((item) => {
    return {
      path: item.path.join(' / '),
      message: item.message,
    };
  });

  const errorObject: ErrorType = { ...ERROR_MAP[400], errors };

  return { errorCode: 400, errorObject };
}
