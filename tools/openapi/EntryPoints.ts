import { type RouteConfig } from '@asteasolutions/zod-to-openapi';
import * as schm from '@/schemas/config';

type EntryType = {
  schema: RouteConfig;
  requireAuth: boolean;
  isMultiLines: boolean;
  slugIdType?: string;
};

export const entries: EntryType[] = [
  { schema: schm.AuthSchema, requireAuth: false, isMultiLines: false },
  { schema: schm.HealthSchema, requireAuth: false, isMultiLines: false },
  { schema: schm.HealthDeepSchema, requireAuth: false, isMultiLines: false },
  { schema: schm.UserCreateSchema, requireAuth: true, isMultiLines: false },
  { schema: schm.UserFindManySchema, requireAuth: true, isMultiLines: true },
  {
    schema: schm.UserFindUniqueSchema,
    requireAuth: true,
    isMultiLines: false,
    slugIdType: 'cuid',
  },
  {
    schema: schm.UserUpdateSchema,
    requireAuth: true,
    isMultiLines: false,
    slugIdType: 'cuid',
  },
  {
    schema: schm.UserDeleteSchema,
    requireAuth: true,
    isMultiLines: false,
    slugIdType: 'cuid',
  },
];
