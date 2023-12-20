import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateWithoutPostInputSchema } from './BookmarkCreateWithoutPostInputSchema';
import { BookmarkUncheckedCreateWithoutPostInputSchema } from './BookmarkUncheckedCreateWithoutPostInputSchema';
import { BookmarkCreateOrConnectWithoutPostInputSchema } from './BookmarkCreateOrConnectWithoutPostInputSchema';
import { BookmarkCreateManyPostInputEnvelopeSchema } from './BookmarkCreateManyPostInputEnvelopeSchema';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';

export const BookmarkCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.BookmarkCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkCreateWithoutPostInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.BookmarkCreateNestedManyWithoutPostInput>;

export default BookmarkCreateNestedManyWithoutPostInputSchema;
