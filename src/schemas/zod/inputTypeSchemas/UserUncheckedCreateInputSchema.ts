import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostUncheckedCreateNestedManyWithoutAuthorInputSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInputSchema';
import { BookmarkUncheckedCreateNestedManyWithoutUserInputSchema } from './BookmarkUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export default UserUncheckedCreateInputSchema;
