import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkCreateManyInputSchema: z.ZodType<Prisma.BookmarkCreateManyInput> = z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.BookmarkCreateManyInput>;

export default BookmarkCreateManyInputSchema;
