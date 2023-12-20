import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateWithoutUserInputSchema } from './BookmarkCreateWithoutUserInputSchema';
import { BookmarkUncheckedCreateWithoutUserInputSchema } from './BookmarkUncheckedCreateWithoutUserInputSchema';
import { BookmarkCreateOrConnectWithoutUserInputSchema } from './BookmarkCreateOrConnectWithoutUserInputSchema';
import { BookmarkUpsertWithWhereUniqueWithoutUserInputSchema } from './BookmarkUpsertWithWhereUniqueWithoutUserInputSchema';
import { BookmarkCreateManyUserInputEnvelopeSchema } from './BookmarkCreateManyUserInputEnvelopeSchema';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithWhereUniqueWithoutUserInputSchema } from './BookmarkUpdateWithWhereUniqueWithoutUserInputSchema';
import { BookmarkUpdateManyWithWhereWithoutUserInputSchema } from './BookmarkUpdateManyWithWhereWithoutUserInputSchema';
import { BookmarkScalarWhereInputSchema } from './BookmarkScalarWhereInputSchema';

export const BookmarkUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutUserInputSchema),z.lazy(() => BookmarkCreateWithoutUserInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutUserInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutUserInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookmarkUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BookmarkUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.BookmarkUncheckedUpdateManyWithoutUserNestedInput>;

export default BookmarkUncheckedUpdateManyWithoutUserNestedInputSchema;
