import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutBookmarksInputSchema } from './UserCreateWithoutBookmarksInputSchema';
import { UserUncheckedCreateWithoutBookmarksInputSchema } from './UserUncheckedCreateWithoutBookmarksInputSchema';
import { UserCreateOrConnectWithoutBookmarksInputSchema } from './UserCreateOrConnectWithoutBookmarksInputSchema';
import { UserUpsertWithoutBookmarksInputSchema } from './UserUpsertWithoutBookmarksInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutBookmarksInputSchema } from './UserUpdateToOneWithWhereWithoutBookmarksInputSchema';
import { UserUpdateWithoutBookmarksInputSchema } from './UserUpdateWithoutBookmarksInputSchema';
import { UserUncheckedUpdateWithoutBookmarksInputSchema } from './UserUncheckedUpdateWithoutBookmarksInputSchema';

export const UserUpdateOneRequiredWithoutBookmarksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBookmarksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBookmarksInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBookmarksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBookmarksInputSchema),z.lazy(() => UserUpdateWithoutBookmarksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBookmarksInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutBookmarksNestedInput>;

export default UserUpdateOneRequiredWithoutBookmarksNestedInputSchema;
