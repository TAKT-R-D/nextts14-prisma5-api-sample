import { z } from 'zod';
import * as builder from '@/schemas/BuildOpenApiSchema';
import { type User as RequestType } from '@/schemas/zod';
import {
  Ex,
  UserModelSchema as ModelSchema,
  BookmarkModelSchema,
  PostModelSchema,
} from '@/schemas/config';

/**
 * PRISMA CONFIGS
 * *PrismaSelect: selected columns. if select all, leave it as {}
 * *PrismaInclude: included columns
 * format*Params: connect etc. if no relational post/put query, just return params.
 */

export const UserPrismaSelect = {};

export const UserPrismaInclude = {
  posts: {
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  },
  bookmarks: {
    select: {
      postId: true,
      post: {
        select: {
          title: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              userName: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  },
  _count: {
    select: {
      posts: true,
      bookmarks: true,
    },
  },
};

export function formatUserParams(params: Partial<RequestType>) {
  return params;
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
  userName: true,
  imageUrl: true,
});

const _requestPutSchema = _requestPostSchema.extend({
  userName: _requestPostSchema.shape.userName.optional(),
  imageUrl: _requestPostSchema.shape.imageUrl.optional(),
});

const _responseSchema = ModelSchema.merge(
  z.object({
    posts: z.array(
      PostModelSchema.pick({ id: true, title: true, createdAt: true })
    ),
    bookmarks: z.array(
      BookmarkModelSchema.pick({ postId: true }).merge(
        z.object({
          post: PostModelSchema.pick({ title: true, createdAt: true }).merge(
            z.object({
              author: ModelSchema.pick({
                id: true,
                userName: true,
                imageUrl: true,
              }),
            })
          ),
        })
      )
    ),
    _count: z.object({
      posts: z.number().int().openapi(Ex.number),
      bookmarks: z.number().int().openapi(Ex.number),
    }),
  })
);

/**
 * OPENAPI PATH CONFIG
 * path, summary, description, tags(user/cms), etc
 */

export const UserCreateSchema = builder.getCreateSchema(
  '/users',
  'create an user',
  'create an user',
  'user',
  _requestPostSchema,
  ModelSchema
);
export const UserFindManySchema = builder.getFindManySchema(
  '/users',
  'get users',
  'get users',
  'user',
  _responseSchema
);
export const UserFindUniqueSchema = builder.getFindUniqueSchema(
  '/users/{id}',
  'get an user',
  'get an user by id',
  'user',
  _responseSchema
);
export const UserUpdateSchema = builder.getUpdateSchema(
  '/users/{id}',
  'update an user',
  'update an user by id',
  'user',
  _requestPutSchema,
  ModelSchema
);
export const UserDeleteSchema = builder.getDeleteSchema(
  '/users/{id}',
  'delete an user',
  'delete an user by id',
  'user'
);
