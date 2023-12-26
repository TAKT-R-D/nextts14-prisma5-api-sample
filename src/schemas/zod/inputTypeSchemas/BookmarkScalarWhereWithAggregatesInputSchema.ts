import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { IntNullableWithAggregatesFilterSchema } from './IntNullableWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const BookmarkScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BookmarkScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema),z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema),z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  postId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.BookmarkScalarWhereWithAggregatesInput>;

export default BookmarkScalarWhereWithAggregatesInputSchema;
