import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostCreateWithoutBookmarksInputSchema } from './PostCreateWithoutBookmarksInputSchema';
import { PostUncheckedCreateWithoutBookmarksInputSchema } from './PostUncheckedCreateWithoutBookmarksInputSchema';
import { PostCreateOrConnectWithoutBookmarksInputSchema } from './PostCreateOrConnectWithoutBookmarksInputSchema';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';

export const PostCreateNestedOneWithoutBookmarksInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutBookmarksInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.PostCreateNestedOneWithoutBookmarksInput>;

export default PostCreateNestedOneWithoutBookmarksInputSchema;
