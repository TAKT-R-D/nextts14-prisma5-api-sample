import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutBookmarksInputSchema } from './UserCreateNestedOneWithoutBookmarksInputSchema';

export const BookmarkCreateWithoutPostInputSchema: z.ZodType<Prisma.BookmarkCreateWithoutPostInput> = z.object({
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookmarksInputSchema)
}).strict() as z.ZodType<Prisma.BookmarkCreateWithoutPostInput>;

export default BookmarkCreateWithoutPostInputSchema;
