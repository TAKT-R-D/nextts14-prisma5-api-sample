import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.BookmarkUncheckedCreateWithoutUserInput>;

export default BookmarkUncheckedCreateWithoutUserInputSchema;
