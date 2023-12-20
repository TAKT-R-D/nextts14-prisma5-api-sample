import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateNestedManyWithoutUserInputSchema } from './BookmarkCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  userName: z.string(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutPostsInput>;

export default UserCreateWithoutPostsInputSchema;
