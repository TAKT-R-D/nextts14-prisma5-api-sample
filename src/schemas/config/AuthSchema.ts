import { z } from 'zod';
import { Ex } from './Commons';
import { getAuthSchema } from '../BuildOpenApiSchema';

export const AuthRequestSchema: any = z.object({
  userId: z.string().cuid().describe('unique user id').openapi(Ex.cuid),
  secret: z.string().describe('api secret').openapi(Ex.secret),
});

const _ResponseSchema: any = z.object({
  access_token: z.string().describe('access_token').openapi(Ex.token),
});

export const AuthSchema = getAuthSchema(
  '/auth/access_token',
  'issue access_token',
  'issue access_token by userId and api secret',
  AuthRequestSchema,
  _ResponseSchema
);
