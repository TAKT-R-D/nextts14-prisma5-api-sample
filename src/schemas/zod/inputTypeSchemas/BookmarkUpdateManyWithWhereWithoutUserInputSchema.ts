import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkScalarWhereInputSchema } from './BookmarkScalarWhereInputSchema';
import { BookmarkUpdateManyMutationInputSchema } from './BookmarkUpdateManyMutationInputSchema';
import { BookmarkUncheckedUpdateManyWithoutUserInputSchema } from './BookmarkUncheckedUpdateManyWithoutUserInputSchema';

export const BookmarkUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BookmarkUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BookmarkScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateManyMutationInputSchema),z.lazy(() => BookmarkUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.BookmarkUpdateManyWithWhereWithoutUserInput>;

export default BookmarkUpdateManyWithWhereWithoutUserInputSchema;
