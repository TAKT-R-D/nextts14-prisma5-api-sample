import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostUncheckedCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutBookmarksInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.PostUncheckedCreateWithoutBookmarksInput>;

export default PostUncheckedCreateWithoutBookmarksInputSchema;
