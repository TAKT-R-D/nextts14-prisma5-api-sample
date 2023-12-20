import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateWithoutPostInputSchema } from './BookmarkCreateWithoutPostInputSchema';
import { BookmarkUncheckedCreateWithoutPostInputSchema } from './BookmarkUncheckedCreateWithoutPostInputSchema';
import { BookmarkCreateOrConnectWithoutPostInputSchema } from './BookmarkCreateOrConnectWithoutPostInputSchema';
import { BookmarkUpsertWithWhereUniqueWithoutPostInputSchema } from './BookmarkUpsertWithWhereUniqueWithoutPostInputSchema';
import { BookmarkCreateManyPostInputEnvelopeSchema } from './BookmarkCreateManyPostInputEnvelopeSchema';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithWhereUniqueWithoutPostInputSchema } from './BookmarkUpdateWithWhereUniqueWithoutPostInputSchema';
import { BookmarkUpdateManyWithWhereWithoutPostInputSchema } from './BookmarkUpdateManyWithWhereWithoutPostInputSchema';
import { BookmarkScalarWhereInputSchema } from './BookmarkScalarWhereInputSchema';

export const BookmarkUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkCreateWithoutPostInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookmarkUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => BookmarkUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.BookmarkUncheckedUpdateManyWithoutPostNestedInput>;

export default BookmarkUncheckedUpdateManyWithoutPostNestedInputSchema;
