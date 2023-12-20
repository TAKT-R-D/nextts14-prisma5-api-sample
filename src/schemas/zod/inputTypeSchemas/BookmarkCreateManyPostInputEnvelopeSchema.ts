import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateManyPostInputSchema } from './BookmarkCreateManyPostInputSchema';

export const BookmarkCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.BookmarkCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BookmarkCreateManyPostInputSchema),z.lazy(() => BookmarkCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.BookmarkCreateManyPostInputEnvelope>;

export default BookmarkCreateManyPostInputEnvelopeSchema;
