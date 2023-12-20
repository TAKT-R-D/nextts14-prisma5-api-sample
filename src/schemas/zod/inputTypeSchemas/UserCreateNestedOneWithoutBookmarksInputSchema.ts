import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutBookmarksInputSchema } from './UserCreateWithoutBookmarksInputSchema';
import { UserUncheckedCreateWithoutBookmarksInputSchema } from './UserUncheckedCreateWithoutBookmarksInputSchema';
import { UserCreateOrConnectWithoutBookmarksInputSchema } from './UserCreateOrConnectWithoutBookmarksInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutBookmarksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBookmarksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBookmarksInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutBookmarksInput>;

export default UserCreateNestedOneWithoutBookmarksInputSchema;
