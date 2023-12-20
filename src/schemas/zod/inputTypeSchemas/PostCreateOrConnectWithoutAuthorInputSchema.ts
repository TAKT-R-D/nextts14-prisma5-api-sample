import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostWhereUniqueInputSchema } from './PostWhereUniqueInputSchema';
import { PostCreateWithoutAuthorInputSchema } from './PostCreateWithoutAuthorInputSchema';
import { PostUncheckedCreateWithoutAuthorInputSchema } from './PostUncheckedCreateWithoutAuthorInputSchema';

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict() as z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput>;

export default PostCreateOrConnectWithoutAuthorInputSchema;
