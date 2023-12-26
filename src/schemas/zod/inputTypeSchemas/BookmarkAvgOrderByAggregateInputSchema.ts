import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BookmarkAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BookmarkAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.BookmarkAvgOrderByAggregateInput>;

export default BookmarkAvgOrderByAggregateInputSchema;
