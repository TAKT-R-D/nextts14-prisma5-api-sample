import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { PostListRelationFilterSchema } from './PostListRelationFilterSchema';
import { BookmarkListRelationFilterSchema } from './BookmarkListRelationFilterSchema';

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userName: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userName: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  bookmarks: z.lazy(() => BookmarkListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.UserWhereUniqueInput>;

export default UserWhereUniqueInputSchema;
