import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id','title','content','authorId','createdAt','updatedAt']);

export default PostScalarFieldEnumSchema;
