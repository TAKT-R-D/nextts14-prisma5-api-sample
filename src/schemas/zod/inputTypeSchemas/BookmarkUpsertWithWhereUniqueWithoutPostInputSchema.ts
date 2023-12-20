import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithoutPostInputSchema } from './BookmarkUpdateWithoutPostInputSchema';
import { BookmarkUncheckedUpdateWithoutPostInputSchema } from './BookmarkUncheckedUpdateWithoutPostInputSchema';
import { BookmarkCreateWithoutPostInputSchema } from './BookmarkCreateWithoutPostInputSchema';
import { BookmarkUncheckedCreateWithoutPostInputSchema } from './BookmarkUncheckedCreateWithoutPostInputSchema';

export const BookmarkUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookmarkUpdateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema) ]),
}).strict() as z.ZodType<Prisma.BookmarkUpsertWithWhereUniqueWithoutPostInput>;

export default BookmarkUpsertWithWhereUniqueWithoutPostInputSchema;
