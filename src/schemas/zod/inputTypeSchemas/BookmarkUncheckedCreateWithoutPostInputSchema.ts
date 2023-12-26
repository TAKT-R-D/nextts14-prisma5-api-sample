import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateWithoutPostInput> = z.object({
  id: z.number().int().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.BookmarkUncheckedCreateWithoutPostInput>;

export default BookmarkUncheckedCreateWithoutPostInputSchema;
