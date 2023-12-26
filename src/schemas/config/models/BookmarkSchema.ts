export const BookmarkRelation = {
  postId: true,
};

export const BookmarkSelect = {};

export const BookmarkInclude = {};

import { z } from 'zod';
import { Ex } from '../Commons';
import { BookmarkSchema } from '../../zod';
import { PostRelationSchema } from './PostSchema';

const modelSchema = BookmarkSchema.extend({
  id: BookmarkSchema.shape.id.describe('bookmark id').openapi(Ex.number),
  postId: BookmarkSchema.shape.postId.describe('post id').openapi(Ex.number),
  userId: BookmarkSchema.shape.userId.describe('user id').openapi(Ex.cuid),
  createdAt: BookmarkSchema.shape.createdAt
    .describe('created date')
    .openapi(Ex.date),
});

export const BookmarkRelationSchema = modelSchema
  .omit({
    id: true,
    userId: true,
    createdAt: true,
  })
  .and(
    z.object({
      post: PostRelationSchema,
    })
  );
