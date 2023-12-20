import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkCreateWithoutUserInputSchema } from './BookmarkCreateWithoutUserInputSchema';
import { BookmarkUncheckedCreateWithoutUserInputSchema } from './BookmarkUncheckedCreateWithoutUserInputSchema';

export const BookmarkCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BookmarkCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutUserInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.BookmarkCreateOrConnectWithoutUserInput>;

export default BookmarkCreateOrConnectWithoutUserInputSchema;
