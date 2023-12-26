import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const BookmarkScalarWhereInputSchema: z.ZodType<Prisma.BookmarkScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  postId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.BookmarkScalarWhereInput>;

export default BookmarkScalarWhereInputSchema;
