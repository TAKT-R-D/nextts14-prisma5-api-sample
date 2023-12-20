import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkWhereInputSchema } from '../inputTypeSchemas/BookmarkWhereInputSchema'
import { BookmarkOrderByWithAggregationInputSchema } from '../inputTypeSchemas/BookmarkOrderByWithAggregationInputSchema'
import { BookmarkScalarFieldEnumSchema } from '../inputTypeSchemas/BookmarkScalarFieldEnumSchema'
import { BookmarkScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/BookmarkScalarWhereWithAggregatesInputSchema'

export const BookmarkGroupByArgsSchema: z.ZodType<Prisma.BookmarkGroupByArgs> = z.object({
  where: BookmarkWhereInputSchema.optional(),
  orderBy: z.union([ BookmarkOrderByWithAggregationInputSchema.array(),BookmarkOrderByWithAggregationInputSchema ]).optional(),
  by: BookmarkScalarFieldEnumSchema.array(),
  having: BookmarkScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.BookmarkGroupByArgs>;

export default BookmarkGroupByArgsSchema;
