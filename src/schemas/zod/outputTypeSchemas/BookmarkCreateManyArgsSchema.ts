import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkCreateManyInputSchema } from '../inputTypeSchemas/BookmarkCreateManyInputSchema'

export const BookmarkCreateManyArgsSchema: z.ZodType<Prisma.BookmarkCreateManyArgs> = z.object({
  data: z.union([ BookmarkCreateManyInputSchema,BookmarkCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.BookmarkCreateManyArgs>;

export default BookmarkCreateManyArgsSchema;
