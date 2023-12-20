import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereInputSchema } from './BookmarkWhereInputSchema';

export const BookmarkListRelationFilterSchema: z.ZodType<Prisma.BookmarkListRelationFilter> = z.object({
  every: z.lazy(() => BookmarkWhereInputSchema).optional(),
  some: z.lazy(() => BookmarkWhereInputSchema).optional(),
  none: z.lazy(() => BookmarkWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.BookmarkListRelationFilter>;

export default BookmarkListRelationFilterSchema;
