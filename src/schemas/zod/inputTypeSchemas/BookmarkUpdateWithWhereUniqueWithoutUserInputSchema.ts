import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithoutUserInputSchema } from './BookmarkUpdateWithoutUserInputSchema';
import { BookmarkUncheckedUpdateWithoutUserInputSchema } from './BookmarkUncheckedUpdateWithoutUserInputSchema';

export const BookmarkUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BookmarkUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateWithoutUserInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.BookmarkUpdateWithWhereUniqueWithoutUserInput>;

export default BookmarkUpdateWithWhereUniqueWithoutUserInputSchema;
