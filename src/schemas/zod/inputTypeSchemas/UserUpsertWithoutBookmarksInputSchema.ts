import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutBookmarksInputSchema } from './UserUpdateWithoutBookmarksInputSchema';
import { UserUncheckedUpdateWithoutBookmarksInputSchema } from './UserUncheckedUpdateWithoutBookmarksInputSchema';
import { UserCreateWithoutBookmarksInputSchema } from './UserCreateWithoutBookmarksInputSchema';
import { UserUncheckedCreateWithoutBookmarksInputSchema } from './UserUncheckedCreateWithoutBookmarksInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutBookmarksInputSchema: z.ZodType<Prisma.UserUpsertWithoutBookmarksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBookmarksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBookmarksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBookmarksInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookmarksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutBookmarksInput>;

export default UserUpsertWithoutBookmarksInputSchema;
