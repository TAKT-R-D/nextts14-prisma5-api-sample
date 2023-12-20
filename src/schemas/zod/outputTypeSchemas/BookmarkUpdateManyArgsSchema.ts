import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkUpdateManyMutationInputSchema } from '../inputTypeSchemas/BookmarkUpdateManyMutationInputSchema'
import { BookmarkUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/BookmarkUncheckedUpdateManyInputSchema'
import { BookmarkWhereInputSchema } from '../inputTypeSchemas/BookmarkWhereInputSchema'

export const BookmarkUpdateManyArgsSchema: z.ZodType<Prisma.BookmarkUpdateManyArgs> = z.object({
  data: z.union([ BookmarkUpdateManyMutationInputSchema,BookmarkUncheckedUpdateManyInputSchema ]),
  where: BookmarkWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.BookmarkUpdateManyArgs>;

export default BookmarkUpdateManyArgsSchema;
