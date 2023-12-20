import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithoutUserInputSchema } from './BookmarkUpdateWithoutUserInputSchema';
import { BookmarkUncheckedUpdateWithoutUserInputSchema } from './BookmarkUncheckedUpdateWithoutUserInputSchema';
import { BookmarkCreateWithoutUserInputSchema } from './BookmarkCreateWithoutUserInputSchema';
import { BookmarkUncheckedCreateWithoutUserInputSchema } from './BookmarkUncheckedCreateWithoutUserInputSchema';

export const BookmarkUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BookmarkUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookmarkUpdateWithoutUserInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutUserInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.BookmarkUpsertWithWhereUniqueWithoutUserInput>;

export default BookmarkUpsertWithWhereUniqueWithoutUserInputSchema;
