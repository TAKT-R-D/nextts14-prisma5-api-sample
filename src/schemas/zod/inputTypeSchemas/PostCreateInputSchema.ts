import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutPostsInputSchema } from './UserCreateNestedOneWithoutPostsInputSchema';
import { BookmarkCreateNestedManyWithoutPostInputSchema } from './BookmarkCreateNestedManyWithoutPostInputSchema';

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutPostInputSchema).optional()
}).strict() as z.ZodType<Prisma.PostCreateInput>;

export default PostCreateInputSchema;
