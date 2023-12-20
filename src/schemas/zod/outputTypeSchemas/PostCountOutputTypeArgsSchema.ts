import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCountOutputTypeSelectSchema } from './PostCountOutputTypeSelectSchema';

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
}).strict();

export default PostCountOutputTypeSelectSchema;
