import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkUncheckedCreateNestedManyWithoutPostInputSchema } from './BookmarkUncheckedCreateNestedManyWithoutPostInputSchema';

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  authorId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict() as z.ZodType<Prisma.PostUncheckedCreateInput>;

export default PostUncheckedCreateInputSchema;
