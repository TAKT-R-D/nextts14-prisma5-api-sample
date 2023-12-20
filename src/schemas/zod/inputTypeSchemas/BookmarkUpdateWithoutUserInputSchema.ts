import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { PostUpdateOneWithoutBookmarksNestedInputSchema } from './PostUpdateOneWithoutBookmarksNestedInputSchema';

export const BookmarkUpdateWithoutUserInputSchema: z.ZodType<Prisma.BookmarkUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneWithoutBookmarksNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.BookmarkUpdateWithoutUserInput>;

export default BookmarkUpdateWithoutUserInputSchema;
