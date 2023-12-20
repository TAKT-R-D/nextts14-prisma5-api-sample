import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostWhereInputSchema } from './PostWhereInputSchema';
import { PostUpdateWithoutBookmarksInputSchema } from './PostUpdateWithoutBookmarksInputSchema';
import { PostUncheckedUpdateWithoutBookmarksInputSchema } from './PostUncheckedUpdateWithoutBookmarksInputSchema';

export const PostUpdateToOneWithWhereWithoutBookmarksInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutBookmarksInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedUpdateWithoutBookmarksInputSchema) ]),
}).strict() as z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutBookmarksInput>;

export default PostUpdateToOneWithWhereWithoutBookmarksInputSchema;
