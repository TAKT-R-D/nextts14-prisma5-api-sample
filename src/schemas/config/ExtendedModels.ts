import { UserSchema } from '@/schemas/zod';
import { PostSchema } from '@/schemas/zod';
import { BookmarkSchema } from '@/schemas/zod';
import { Ex } from './Commons';

/**
 * Extend model schema for openapi: add description, example
 */

export const UserModelSchema = UserSchema.extend({
  id: UserSchema.shape.id.describe('user id').openapi(Ex.cuid),
  userName: UserSchema.shape.userName
    .describe('unique user name')
    .openapi(Ex.name),
  imageUrl: UserSchema.shape.imageUrl.describe('user image').openapi(Ex.image),
  createdAt: UserSchema.shape.createdAt
    .describe('created date')
    .openapi(Ex.date),
  updatedAt: UserSchema.shape.updatedAt
    .describe('updated date')
    .openapi(Ex.date),
});

export const PostModelSchema = PostSchema.extend({
  id: PostSchema.shape.id.describe('post id').openapi(Ex.number),
  title: PostSchema.shape.title.describe('post title').openapi(Ex.shortText),
  content: PostSchema.shape.content
    .describe('post content')
    .openapi(Ex.longText),
  authorId: PostSchema.shape.authorId.describe('author id').openapi(Ex.cuid),
  createdAt: PostSchema.shape.createdAt
    .describe('created date')
    .openapi(Ex.date),
  updatedAt: PostSchema.shape.updatedAt
    .describe('updated date')
    .openapi(Ex.date),
});

export const BookmarkModelSchema = BookmarkSchema.extend({
  id: BookmarkSchema.shape.id.describe('bookmark id').openapi(Ex.number),
  postId: BookmarkSchema.shape.postId.describe('post id').openapi(Ex.number),
  userId: BookmarkSchema.shape.userId.describe('user id').openapi(Ex.cuid),
  createdAt: BookmarkSchema.shape.createdAt
    .describe('created date')
    .openapi(Ex.date),
});
