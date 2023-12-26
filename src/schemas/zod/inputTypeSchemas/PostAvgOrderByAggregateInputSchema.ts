import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const PostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.PostAvgOrderByAggregateInput>;

export default PostAvgOrderByAggregateInputSchema;
