import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { PostUpdateOneWithoutBookmarksNestedInputSchema } from './PostUpdateOneWithoutBookmarksNestedInputSchema';
import { UserUpdateOneRequiredWithoutBookmarksNestedInputSchema } from './UserUpdateOneRequiredWithoutBookmarksNestedInputSchema';

export const BookmarkUpdateInputSchema: z.ZodType<Prisma.BookmarkUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneWithoutBookmarksNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.BookmarkUpdateInput>;

export default BookmarkUpdateInputSchema;
