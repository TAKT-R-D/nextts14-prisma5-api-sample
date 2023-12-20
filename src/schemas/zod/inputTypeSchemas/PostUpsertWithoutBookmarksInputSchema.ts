import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostUpdateWithoutBookmarksInputSchema } from './PostUpdateWithoutBookmarksInputSchema';
import { PostUncheckedUpdateWithoutBookmarksInputSchema } from './PostUncheckedUpdateWithoutBookmarksInputSchema';
import { PostCreateWithoutBookmarksInputSchema } from './PostCreateWithoutBookmarksInputSchema';
import { PostUncheckedCreateWithoutBookmarksInputSchema } from './PostUncheckedCreateWithoutBookmarksInputSchema';
import { PostWhereInputSchema } from './PostWhereInputSchema';

export const PostUpsertWithoutBookmarksInputSchema: z.ZodType<Prisma.PostUpsertWithoutBookmarksInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedUpdateWithoutBookmarksInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedCreateWithoutBookmarksInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.PostUpsertWithoutBookmarksInput>;

export default PostUpsertWithoutBookmarksInputSchema;
