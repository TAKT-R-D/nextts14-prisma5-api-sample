import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkCreateManyPostInputSchema: z.ZodType<Prisma.BookmarkCreateManyPostInput> = z.object({
  id: z.number().int().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.BookmarkCreateManyPostInput>;

export default BookmarkCreateManyPostInputSchema;
