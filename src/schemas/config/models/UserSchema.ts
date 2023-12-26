import { z } from 'zod';
import * as builder from '../../BuildOpenApiSchema';
import { UserSchema } from '../../zod';
import { Ex, IdCuidSchema as idSchema } from '../Commons';
import { PostRelation, PostRelationSchema } from './PostSchema';
import { BookmarkRelation, BookmarkRelationSchema } from './BookmarkSchema';

/**
 * PRISMA CONFIGS
 * *PrismaRelation: selected columns when it's called from other models
 * *PrismaSelect: selected columns. if select all, leave it as {}
 * *PrismaInclude: included columns
 */
export const UserPrismaRelation = {
  id: true,
  userName: true,
  imageUrl: true,
};

export const UserPrismaSelect = {};

export const UserPrismaInclude = {
  posts: {
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    select: PostRelation,
  },
  bookmarks: {
    select: BookmarkRelation,
  },
  _count: {
    select: {
      posts: true,
      bookmarks: true,
    },
  },
};

/**
 * OPENAPI CONFIGS
 * add describe & example
 *
 * _modelSchema: basic model extends zod modelSchema
 * *RelationSchema: should be same columns as *PrismaRelation
 * _findSchema: should be same columns as *PrismaSelect + *PrismaInclude
 */
// openapi: add describe & example
const _modelSchema = UserSchema.extend({
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

export const UserRelationSchema = _modelSchema.omit({
  createdAt: true,
  updatedAt: true,
});

const _findSchema: any = _modelSchema.and(
  z.object({
    posts: z.array(PostRelationSchema),
    bookmarks: z.array(BookmarkRelationSchema),
    _count: z.object({
      posts: z.number().int().openapi(Ex.number),
      bookmarks: z.number().int().openapi(Ex.number),
    }),
  })
);

/**
 * OPENAPI PATH CONFIG
 * path, tags, etc
 */
export const UserFindManySchema = builder.getFindManySchema(
  '/users',
  'get users',
  'get users',
  'user',
  _findSchema
);
export const UserCreateSchema = builder.getCreateSchema(
  '/users',
  'create an user',
  'create an user',
  'user',
  _modelSchema,
  UserRelationSchema
);
export const UserFindUniqueSchema = builder.getFindUniqueSchema(
  '/users/{id}',
  'get an user',
  'get an user by id',
  'user',
  _findSchema,
  idSchema
);
export const UserUpdateSchema = builder.getUpdateSchema(
  '/users/{id}',
  'updata an user',
  'update an user by id',
  'user',
  _modelSchema,
  UserRelationSchema,
  idSchema
);
export const UserDeleteSchema = builder.getDeleteSchema(
  '/users/{id}',
  'delete an user',
  'delete an user by id',
  'user',
  idSchema
);
