import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkCreateManyUserInputSchema: z.ZodType<Prisma.BookmarkCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.BookmarkCreateManyUserInput>;

export default BookmarkCreateManyUserInputSchema;
