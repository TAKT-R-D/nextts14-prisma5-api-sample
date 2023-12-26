import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostCreateNestedManyWithoutAuthorInputSchema } from './PostCreateNestedManyWithoutAuthorInputSchema';

export const UserCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.UserCreateWithoutBookmarksInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutBookmarksInput>;

export default UserCreateWithoutBookmarksInputSchema;
