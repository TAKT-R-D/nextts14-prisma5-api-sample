import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkSelectSchema } from '../inputTypeSchemas/BookmarkSelectSchema';
import { BookmarkIncludeSchema } from '../inputTypeSchemas/BookmarkIncludeSchema';

export const BookmarkArgsSchema: z.ZodType<Prisma.BookmarkDefaultArgs> = z.object({
  select: z.lazy(() => BookmarkSelectSchema).optional(),
  include: z.lazy(() => BookmarkIncludeSchema).optional(),
}).strict();

export default BookmarkArgsSchema;
