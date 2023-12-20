import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateManyUserInputSchema } from './BookmarkCreateManyUserInputSchema';

export const BookmarkCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BookmarkCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BookmarkCreateManyUserInputSchema),z.lazy(() => BookmarkCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.BookmarkCreateManyUserInputEnvelope>;

export default BookmarkCreateManyUserInputEnvelopeSchema;
