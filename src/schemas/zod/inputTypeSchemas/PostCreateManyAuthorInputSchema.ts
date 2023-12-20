import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.PostCreateManyAuthorInput>;

export default PostCreateManyAuthorInputSchema;
