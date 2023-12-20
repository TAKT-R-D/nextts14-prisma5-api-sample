import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutPostsInputSchema } from './UserCreateNestedOneWithoutPostsInputSchema';

export const PostCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.PostCreateWithoutBookmarksInput> = z.object({
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema)
}).strict() as z.ZodType<Prisma.PostCreateWithoutBookmarksInput>;

export default PostCreateWithoutBookmarksInputSchema;
