import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutPostsInputSchema } from './UserCreateWithoutPostsInputSchema';
import { UserUncheckedCreateWithoutPostsInputSchema } from './UserUncheckedCreateWithoutPostsInputSchema';
import { UserCreateOrConnectWithoutPostsInputSchema } from './UserCreateOrConnectWithoutPostsInputSchema';
import { UserUpsertWithoutPostsInputSchema } from './UserUpsertWithoutPostsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutPostsInputSchema } from './UserUpdateToOneWithWhereWithoutPostsInputSchema';
import { UserUpdateWithoutPostsInputSchema } from './UserUpdateWithoutPostsInputSchema';
import { UserUncheckedUpdateWithoutPostsInputSchema } from './UserUncheckedUpdateWithoutPostsInputSchema';

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput>;

export default UserUpdateOneRequiredWithoutPostsNestedInputSchema;
