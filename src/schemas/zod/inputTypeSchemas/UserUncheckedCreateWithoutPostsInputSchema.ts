import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkUncheckedCreateNestedManyWithoutUserInputSchema } from './BookmarkUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput>;

export default UserUncheckedCreateWithoutPostsInputSchema;
