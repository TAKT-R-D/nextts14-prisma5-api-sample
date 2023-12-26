import { z } from 'zod';
import { getHealthSchema } from '../BuildOpenApiSchema';

const _ResponseSchema: any = z.object({
  status: z.string().openapi({ example: 'pass' }),
  message: z.string().openapi({ example: 'success to connect' }),
});

export const HealthSchema = getHealthSchema(
  '/health',
  'health check',
  'health check',
  _ResponseSchema
);
export const HealthDeepSchema = getHealthSchema(
  '/health/deep',
  'health check with database connection',
  'health check with database connection',
  _ResponseSchema
);
