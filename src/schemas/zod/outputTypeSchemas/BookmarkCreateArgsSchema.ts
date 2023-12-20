import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkIncludeSchema } from '../inputTypeSchemas/BookmarkIncludeSchema'
import { BookmarkCreateInputSchema } from '../inputTypeSchemas/BookmarkCreateInputSchema'
import { BookmarkUncheckedCreateInputSchema } from '../inputTypeSchemas/BookmarkUncheckedCreateInputSchema'
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

export const BookmarkCreateArgsSchema: z.ZodType<Prisma.BookmarkCreateArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  data: z.union([ BookmarkCreateInputSchema,BookmarkUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.BookmarkCreateArgs>;

export default BookmarkCreateArgsSchema;
