import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkScalarWhereInputSchema } from './BookmarkScalarWhereInputSchema';
import { BookmarkUpdateManyMutationInputSchema } from './BookmarkUpdateManyMutationInputSchema';
import { BookmarkUncheckedUpdateManyWithoutPostInputSchema } from './BookmarkUncheckedUpdateManyWithoutPostInputSchema';

export const BookmarkUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => BookmarkScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateManyMutationInputSchema),z.lazy(() => BookmarkUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict() as z.ZodType<Prisma.BookmarkUpdateManyWithWhereWithoutPostInput>;

export default BookmarkUpdateManyWithWhereWithoutPostInputSchema;
