import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithoutPostInputSchema } from './BookmarkUpdateWithoutPostInputSchema';
import { BookmarkUncheckedUpdateWithoutPostInputSchema } from './BookmarkUncheckedUpdateWithoutPostInputSchema';

export const BookmarkUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutPostInputSchema) ]),
}).strict() as z.ZodType<Prisma.BookmarkUpdateWithWhereUniqueWithoutPostInput>;

export default BookmarkUpdateWithWhereUniqueWithoutPostInputSchema;
