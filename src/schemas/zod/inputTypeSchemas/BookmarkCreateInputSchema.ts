import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostCreateNestedOneWithoutBookmarksInputSchema } from './PostCreateNestedOneWithoutBookmarksInputSchema';
import { UserCreateNestedOneWithoutBookmarksInputSchema } from './UserCreateNestedOneWithoutBookmarksInputSchema';

export const BookmarkCreateInputSchema: z.ZodType<Prisma.BookmarkCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutBookmarksInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookmarksInputSchema)
}).strict() as z.ZodType<Prisma.BookmarkCreateInput>;

export default BookmarkCreateInputSchema;
