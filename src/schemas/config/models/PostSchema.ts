import { z } from 'zod';
import * as builder from '@/schemas/BuildOpenApiSchema';
import { type Post as RequestType } from '@/schemas/zod';
import {
  Ex,
  PostModelSchema as ModelSchema,
  BookmarkModelSchema,
  UserModelSchema,
} from '@/schemas/config';

/**
 * PRISMA CONFIGS
 * *PrismaSelect: selected columns. if select all, leave it as {}
 * *PrismaInclude: included columns
 * format*Params: connect etc. if no relational post/put query, just return params.
 */

export const PostPrismaSelect = {};

export const PostPrismaInclude = {
  author: {
    select: {
      id: true,
      userName: true,
      imageUrl: true,
    },
  },
  bookmarks: {
    select: {
      userId: true,
      user: {
        select: {
          id: true,
          userName: true,
          imageUrl: true,
        },
      },
    },
  },
  _count: {
    select: {
      bookmarks: true,
    },
  },
};

export function formatPostParams(params: Partial<RequestType>) {
  const { authorId, ...rest } = params;
  let formattedParams: any = { ...rest };
  if (authorId) {
    formattedParams = {
      ...formattedParams,
      author: { connect: { id: authorId } },
    };
  }
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
  title: true,
  content: true,
  authorId: true,
});

const _requestPutSchema = _requestPostSchema.extend({
  title: _requestPostSchema.shape.title.optional(),
  content: _requestPostSchema.shape.content.optional(),
  authorId: _requestPostSchema.shape.authorId.optional(),
});

const _responseSchema = ModelSchema.merge(
  z.object({
    author: UserModelSchema.pick({
      id: true,
      userName: true,
      imageUrl: true,
    }),
    bookmarks: z.array(
      BookmarkModelSchema.pick({
        userId: true,
      }).merge(
        z.object({
          user: UserModelSchema.pick({
            id: true,
            userName: true,
            imageUrl: true,
          }),
        })
      )
    ),
    _count: z.object({
      bookmarks: z.number().int().openapi(Ex.number),
    }),
  })
);

/**
 * OPENAPI PATH CONFIG
 * path, summary, description, tags(user/cms), etc
 */

export const PostCreateSchema = builder.getCreateSchema(
  '/posts',
  'create a post',
  'create a post',
  'user',
  _requestPostSchema,
  ModelSchema
);
export const PostFindManySchema = builder.getFindManySchema(
  '/posts',
  'get posts list',
  'get posts list',
  'user',
  _responseSchema
);
export const PostFindUniqueSchema = builder.getFindUniqueSchema(
  '/posts/{id}',
  'get a post',
  'get a post by id',
  'user',
  _responseSchema
);
export const PostUpdateSchema = builder.getUpdateSchema(
  '/posts/{id}',
  'update a post',
  'update a post by id',
  'user',
  _requestPutSchema,
  ModelSchema
);
export const PostDeleteSchema = builder.getDeleteSchema(
  '/posts/{id}',
  'delete a post',
  'delete a post by id',
  'user'
);
