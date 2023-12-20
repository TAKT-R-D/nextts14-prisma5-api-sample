import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateWithoutUserInputSchema } from './BookmarkCreateWithoutUserInputSchema';
import { BookmarkUncheckedCreateWithoutUserInputSchema } from './BookmarkUncheckedCreateWithoutUserInputSchema';
import { BookmarkCreateOrConnectWithoutUserInputSchema } from './BookmarkCreateOrConnectWithoutUserInputSchema';
import { BookmarkCreateManyUserInputEnvelopeSchema } from './BookmarkCreateManyUserInputEnvelopeSchema';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';

export const BookmarkCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BookmarkCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutUserInputSchema),z.lazy(() => BookmarkCreateWithoutUserInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutUserInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutUserInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.BookmarkCreateNestedManyWithoutUserInput>;

export default BookmarkCreateNestedManyWithoutUserInputSchema;
