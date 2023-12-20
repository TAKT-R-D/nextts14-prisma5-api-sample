import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkIncludeSchema } from '../inputTypeSchemas/BookmarkIncludeSchema'
import { BookmarkUpdateInputSchema } from '../inputTypeSchemas/BookmarkUpdateInputSchema'
import { BookmarkUncheckedUpdateInputSchema } from '../inputTypeSchemas/BookmarkUncheckedUpdateInputSchema'
import { BookmarkWhereUniqueInputSchema } from '../inputTypeSchemas/BookmarkWhereUniqueInputSchema'
import { PostArgsSchema } from "../outputTypeSchemas/PostArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BookmarkSelectSchema: z.ZodType<Prisma.BookmarkSelect> = z.object({
  id: z.boolean().optional(),
  postId: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const BookmarkUpdateArgsSchema: z.ZodType<Prisma.BookmarkUpdateArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  data: z.union([ BookmarkUpdateInputSchema,BookmarkUncheckedUpdateInputSchema ]),
  where: BookmarkWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.BookmarkUpdateArgs>;

export default BookmarkUpdateArgsSchema;
