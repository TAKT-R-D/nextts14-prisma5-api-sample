import { z } from 'zod';

/////////////////////////////////////////
// BOOKMARK SCHEMA
/////////////////////////////////////////

export const BookmarkSchema = z.object({
  id: z.number().int(),
  postId: z.number().int().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
})

export type Bookmark = z.infer<typeof BookmarkSchema>

export default BookmarkSchema;
