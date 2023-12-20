import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkUncheckedCreateNestedManyWithoutPostInputSchema } from './BookmarkUncheckedCreateNestedManyWithoutPostInputSchema';

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict() as z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput>;

export default PostUncheckedCreateWithoutAuthorInputSchema;
