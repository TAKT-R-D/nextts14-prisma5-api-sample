import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostCreateNestedOneWithoutBookmarksInputSchema } from './PostCreateNestedOneWithoutBookmarksInputSchema';

export const BookmarkCreateWithoutUserInputSchema: z.ZodType<Prisma.BookmarkCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutBookmarksInputSchema).optional()
}).strict() as z.ZodType<Prisma.BookmarkCreateWithoutUserInput>;

export default BookmarkCreateWithoutUserInputSchema;
