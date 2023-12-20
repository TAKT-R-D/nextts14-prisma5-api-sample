import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkCreateWithoutPostInputSchema } from './BookmarkCreateWithoutPostInputSchema';
import { BookmarkUncheckedCreateWithoutPostInputSchema } from './BookmarkUncheckedCreateWithoutPostInputSchema';

export const BookmarkCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.BookmarkCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema) ]),
}).strict() as z.ZodType<Prisma.BookmarkCreateOrConnectWithoutPostInput>;

export default BookmarkCreateOrConnectWithoutPostInputSchema;
