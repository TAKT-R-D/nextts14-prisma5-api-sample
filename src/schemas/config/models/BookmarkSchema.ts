import { z } from 'zod';
import * as builder from '@/schemas/BuildOpenApiSchema';
import { type Bookmark as RequestType } from '@/schemas/zod';
import {
  BookmarkModelSchema as ModelSchema,
  PostModelSchema,
  UserModelSchema,
} from '@/schemas/config';

/**
 * PRISMA CONFIGS
 * *PrismaSelect: selected columns. if select all, leave it as {}
 * *PrismaInclude: included columns
 * format*Params: connect etc. if no relational post/put query, just return params.
 */

export const BookmarkPrismaSelect = {};

export const BookmarkPrismaInclude = {
  post: {
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  },
  user: {
    select: {
      id: true,
      userName: true,
      imageUrl: true,
    },
  },
};

export function formatBookmarkParams(params: Partial<RequestType>) {
  const { postId, userId, ...rest } = params;
  let formattedParams: any = { ...rest };
  if (postId)
    formattedParams = {
      ...formattedParams,
      post: { connect: { id: +postId } },
    };
  if (userId)
    formattedParams = { ...formattedParams, user: { connect: { id: userId } } };
  return formattedParams;
}

/**
 * OPENAPI CONFIGS
 * add describe & example
 *
 * _requestPostSchema: request body for POST request
 * _requestPutSchema: request body for PUT request. basically all are optional
 * _responseSchema: response body with relations
 */

const _requestPostSchema = ModelSchema.pick({
  postId: true,
  userId: true,
});

const _requestPutSchema = _requestPostSchema.extend({
  postId: _requestPostSchema.shape.postId.optional(),
  userId: _requestPostSchema.shape.userId.optional(),
});

const _responseSchema = ModelSchema.merge(
  z.object({
    post: PostModelSchema.pick({ id: true, title: true, createdAt: true }),
    user: UserModelSchema.pick({ id: true, userName: true, imageUrl: true }),
  })
);

/**
 * OPENAPI PATH CONFIG
 * path, summary, description, tags(user/cms), etc
 */

export const BookmarkCreateSchema = builder.getCreateSchema(
  '/bookmarks',
  'create a bookmark',
  'create a bookmark',
  'user',
  _requestPostSchema,
  ModelSchema
);
export const BookmarkFindManySchema = builder.getFindManySchema(
  '/bookmarks',
  'get bookmarks list',
  'get bookmarks list',
  'user',
  _responseSchema
);
export const BookmarkFindUniqueSchema = builder.getFindUniqueSchema(
  '/bookmarks/{id}',
  'get a bookmark',
  'get a bookmark by id',
  'user',
  _responseSchema
);
export const BookmarkUpdateSchema = builder.getUpdateSchema(
  '/bookmarks/{id}',
  'update a bookmark',
  'update a bookmark by id',
  'user',
  _requestPutSchema,
  ModelSchema
);
export const BookmarkDeleteSchema = builder.getDeleteSchema(
  '/bookmarks/{id}',
  'delete a bookmark',
  'delete a bookmark by id',
  'user'
);
