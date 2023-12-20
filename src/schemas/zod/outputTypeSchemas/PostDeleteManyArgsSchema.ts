import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereInputSchema } from '../inputTypeSchemas/PostWhereInputSchema'

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.PostDeleteManyArgs>;

export default PostDeleteManyArgsSchema;
