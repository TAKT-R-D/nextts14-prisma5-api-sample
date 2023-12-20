import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostCreateWithoutBookmarksInputSchema } from './PostCreateWithoutBookmarksInputSchema';
import { PostUncheckedCreateWithoutBookmarksInputSchema } from './PostUncheckedCreateWithoutBookmarksInputSchema';
import { PostCreateOrConnectWithoutBookmarksInputSchema } from './PostCreateOrConnectWithoutBookmarksInputSchema';
import { PostUpsertWithoutBookmarksInputSchema } from './PostUpsertWithoutBookmarksInputSchema';
import { PostWhereInputSchema } from './PostWhereInputSchema';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';
import { PostUpdateToOneWithWhereWithoutBookmarksInputSchema } from './PostUpdateToOneWithWhereWithoutBookmarksInputSchema';
import { PostUpdateWithoutBookmarksInputSchema } from './PostUpdateWithoutBookmarksInputSchema';
import { PostUncheckedUpdateWithoutBookmarksInputSchema } from './PostUncheckedUpdateWithoutBookmarksInputSchema';

export const PostUpdateOneWithoutBookmarksNestedInputSchema: z.ZodType<Prisma.PostUpdateOneWithoutBookmarksNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutBookmarksInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutBookmarksInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PostWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PostWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutBookmarksInputSchema),z.lazy(() => PostUpdateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedUpdateWithoutBookmarksInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.PostUpdateOneWithoutBookmarksNestedInput>;

export default PostUpdateOneWithoutBookmarksNestedInputSchema;
