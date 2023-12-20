import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostUncheckedCreateNestedManyWithoutAuthorInputSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInputSchema';

export const UserUncheckedCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBookmarksInput> = z.object({
  id: z.number().int().optional(),
  userName: z.string(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutBookmarksInput>;

export default UserUncheckedCreateWithoutBookmarksInputSchema;
