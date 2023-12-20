import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateNestedManyWithoutPostInputSchema } from './BookmarkCreateNestedManyWithoutPostInputSchema';

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.object({
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutPostInputSchema).optional()
}).strict() as z.ZodType<Prisma.PostCreateWithoutAuthorInput>;

export default PostCreateWithoutAuthorInputSchema;
