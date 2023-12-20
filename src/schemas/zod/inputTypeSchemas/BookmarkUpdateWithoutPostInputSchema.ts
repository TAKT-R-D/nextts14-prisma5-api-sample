import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutBookmarksNestedInputSchema } from './UserUpdateOneRequiredWithoutBookmarksNestedInputSchema';

export const BookmarkUpdateWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUpdateWithoutPostInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.BookmarkUpdateWithoutPostInput>;

export default BookmarkUpdateWithoutPostInputSchema;
