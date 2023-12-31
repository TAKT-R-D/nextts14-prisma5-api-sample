import { z } from 'zod';
import { handleZodError } from './ZodErrorHandler';

export async function validateSlugParameters(
  Schema: z.ZodType,
  id: string | number
) {
  const params = typeof id === 'number' ? { id: +id } : { id };
  const result = Schema.safeParse(params);
  let data: any = { success: result.success };
  if (result.success === false) {
    const { errorObject } = handleZodError(result.error);
    return { ...data, error: errorObject, where: undefined };
  } else {
    return { ...data, error: undefined, where: result.data };
  }
}
