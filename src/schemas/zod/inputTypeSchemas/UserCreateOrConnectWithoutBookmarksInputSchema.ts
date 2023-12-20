import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutBookmarksInputSchema } from './UserCreateWithoutBookmarksInputSchema';
import { UserUncheckedCreateWithoutBookmarksInputSchema } from './UserUncheckedCreateWithoutBookmarksInputSchema';

export const UserCreateOrConnectWithoutBookmarksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBookmarksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBookmarksInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookmarksInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutBookmarksInput>;

export default UserCreateOrConnectWithoutBookmarksInputSchema;
