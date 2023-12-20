import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkWhereInputSchema } from '../inputTypeSchemas/BookmarkWhereInputSchema'

export const BookmarkDeleteManyArgsSchema: z.ZodType<Prisma.BookmarkDeleteManyArgs> = z.object({
  where: BookmarkWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.BookmarkDeleteManyArgs>;

export default BookmarkDeleteManyArgsSchema;
