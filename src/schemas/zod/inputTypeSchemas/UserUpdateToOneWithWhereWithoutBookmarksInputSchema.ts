import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutBookmarksInputSchema } from './UserUpdateWithoutBookmarksInputSchema';
import { UserUncheckedUpdateWithoutBookmarksInputSchema } from './UserUncheckedUpdateWithoutBookmarksInputSchema';

export const UserUpdateToOneWithWhereWithoutBookmarksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBookmarksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBookmarksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBookmarksInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBookmarksInput>;

export default UserUpdateToOneWithWhereWithoutBookmarksInputSchema;
