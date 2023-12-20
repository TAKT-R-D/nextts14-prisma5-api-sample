import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';
import { PostCreateWithoutBookmarksInputSchema } from './PostCreateWithoutBookmarksInputSchema';
import { PostUncheckedCreateWithoutBookmarksInputSchema } from './PostUncheckedCreateWithoutBookmarksInputSchema';

export const PostCreateOrConnectWithoutBookmarksInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutBookmarksInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedCreateWithoutBookmarksInputSchema) ]),
}).strict() as z.ZodType<Prisma.PostCreateOrConnectWithoutBookmarksInput>;

export default PostCreateOrConnectWithoutBookmarksInputSchema;
