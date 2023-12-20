import { z } from 'zod';

export const BookmarkScalarFieldEnumSchema = z.enum(['id','postId','userId','createdAt']);

export default BookmarkScalarFieldEnumSchema;
