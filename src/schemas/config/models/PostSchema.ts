export const PostRelation = {
  id: true,
  title: true,
  createdAt: true,
};

export const PostSelect = {};

export const PostInclude = {};

import { z } from 'zod';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Ex, CommonQuery, GETErrorResponses } from '../Commons';
import { PostSchema } from '../../zod';
import { resolveMx } from 'dns';

const modelSchema = PostSchema.extend({
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

export const PostRelationSchema = modelSchema.omit({
  content: true,
  authorId: true,
  updatedAt: true,
});
