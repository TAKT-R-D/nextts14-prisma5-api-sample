import * as schm from './config';
import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

type EntryType = {
  schema: RouteConfig;
  requireAuth: boolean;
  isMultiLines: boolean;
};

export const entries: EntryType[] = [
  { schema: schm.AuthSchema, requireAuth: false, isMultiLines: false },
  { schema: schm.HealthSchema, requireAuth: false, isMultiLines: false },
  { schema: schm.HealthDeepSchema, requireAuth: false, isMultiLines: false },
  { schema: schm.UserCreateSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.UserFindManySchema, requireAuth: true, isMultiLines: true },
  { schema: schm.UserFindUniqueSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.UserUpdateSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.UserDeleteSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.PostCreateSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.PostFindManySchema, requireAuth: true, isMultiLines: true },
  { schema: schm.PostFindUniqueSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.PostUpdateSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.PostDeleteSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.BookmarkCreateSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.BookmarkFindManySchema, requireAuth: true, isMultiLines: true },
  { schema: schm.BookmarkFindUniqueSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.BookmarkUpdateSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.BookmarkDeleteSchema, requireAuth: true, isMultiLines: false },
];
