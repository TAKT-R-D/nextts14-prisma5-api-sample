import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkIncludeSchema } from '../inputTypeSchemas/BookmarkIncludeSchema'
import { BookmarkWhereUniqueInputSchema } from '../inputTypeSchemas/BookmarkWhereUniqueInputSchema'
import { BookmarkCreateInputSchema } from '../inputTypeSchemas/BookmarkCreateInputSchema'
import { BookmarkUncheckedCreateInputSchema } from '../inputTypeSchemas/BookmarkUncheckedCreateInputSchema'
import { BookmarkUpdateInputSchema } from '../inputTypeSchemas/BookmarkUpdateInputSchema'
import { BookmarkUncheckedUpdateInputSchema } from '../inputTypeSchemas/BookmarkUncheckedUpdateInputSchema'
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

export const BookmarkUpsertArgsSchema: z.ZodType<Prisma.BookmarkUpsertArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  where: BookmarkWhereUniqueInputSchema,
  create: z.union([ BookmarkCreateInputSchema,BookmarkUncheckedCreateInputSchema ]),
  update: z.union([ BookmarkUpdateInputSchema,BookmarkUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.BookmarkUpsertArgs>;

export default BookmarkUpsertArgsSchema;
