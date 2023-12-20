import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { BookmarkCountOrderByAggregateInputSchema } from './BookmarkCountOrderByAggregateInputSchema';
import { BookmarkAvgOrderByAggregateInputSchema } from './BookmarkAvgOrderByAggregateInputSchema';
import { BookmarkMaxOrderByAggregateInputSchema } from './BookmarkMaxOrderByAggregateInputSchema';
import { BookmarkMinOrderByAggregateInputSchema } from './BookmarkMinOrderByAggregateInputSchema';
import { BookmarkSumOrderByAggregateInputSchema } from './BookmarkSumOrderByAggregateInputSchema';

export const BookmarkOrderByWithAggregationInputSchema: z.ZodType<Prisma.BookmarkOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BookmarkCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BookmarkAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookmarkMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookmarkMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BookmarkSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.BookmarkOrderByWithAggregationInput>;

export default BookmarkOrderByWithAggregationInputSchema;
