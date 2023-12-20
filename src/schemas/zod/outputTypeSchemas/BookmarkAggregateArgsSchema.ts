import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkWhereInputSchema } from '../inputTypeSchemas/BookmarkWhereInputSchema'
import { BookmarkOrderByWithRelationInputSchema } from '../inputTypeSchemas/BookmarkOrderByWithRelationInputSchema'
import { BookmarkWhereUniqueInputSchema } from '../inputTypeSchemas/BookmarkWhereUniqueInputSchema'

export const BookmarkAggregateArgsSchema: z.ZodType<Prisma.BookmarkAggregateArgs> = z.object({
  where: BookmarkWhereInputSchema.optional(),
  orderBy: z.union([ BookmarkOrderByWithRelationInputSchema.array(),BookmarkOrderByWithRelationInputSchema ]).optional(),
  cursor: BookmarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.BookmarkAggregateArgs>;

export default BookmarkAggregateArgsSchema;
