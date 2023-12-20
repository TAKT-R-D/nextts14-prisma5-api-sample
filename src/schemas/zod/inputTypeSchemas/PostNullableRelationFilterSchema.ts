import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostWhereInputSchema } from './PostWhereInputSchema';

export const PostNullableRelationFilterSchema: z.ZodType<Prisma.PostNullableRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PostWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.PostNullableRelationFilter>;

export default PostNullableRelationFilterSchema;
