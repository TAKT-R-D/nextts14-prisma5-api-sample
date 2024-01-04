import { z, AnyZodObject } from 'zod';
import {
  extendZodWithOpenApi,
  ResponseConfig,
} from '@asteasolutions/zod-to-openapi';
import { ERROR_MAP } from '@/lib/ErrorMessages';

extendZodWithOpenApi(z);

export const Ex = {
  number: { example: 1 },
  string: { example: 'somestring' },
  cuid: { example: 'clqj40goe0000z21ibpk26izw' },
  name: { example: 'John Doe' },
  image: { example: '/images/image.png' },
  date: { example: '2021-11-23T07:00:00Z' },
  error: { example: 'error message' },
  token: {
    example:
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiYWRtaW4iLCJpbWFnZVVybCI6Ii90YWt0LnBuZyIsImlhdCI6MTcwMzA0MDUzMCwiaXNzIjoidXJuOmV4YW1wbGU6aXNzdWVyIiwiYXVkIjoidXJuOmV4YW1wbGU6YXVkaWVuY2UiLCJleHAiOjE3MDMwNzY1MzB9.UGcaC4PI-_2hFTThL3WhgTrMZbnulivAoyVjh14hq-d',
  },
  secret: { example: 'YOUR_API_SECRET' },
  shortText: { example: 'YLorem ipsum dolor sit amet' },
  longText: {
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};

export const CommonQuery: AnyZodObject = z.object({
  page: z.number().int().optional().describe('page number').openapi(Ex.number),
  limit: z.number().int().optional().default(100).describe('limit to take'),
  orderby: z
    .string()
    .optional()
    .describe('join key:direction with comma')
    .openapi({ example: 'id:desc,updatedAt:asc' }),
});

// errors
function _ErrorSchema(errorCode: number) {
  return z.object({
    error: z.object({
      message: z.string().openapi({ example: ERROR_MAP[errorCode].message }),
      errors: z
        .array(
          z.object({
            path: z.string().openapi({ example: 'error path' }),
            message: z.string().openapi({ example: 'error message' }),
          })
        )
        .optional(),
    }),
  });
}

const _Error400: ResponseConfig = {
  description: ERROR_MAP[400].message,
  content: { 'application/json; charset=utf-8': { schema: _ErrorSchema(400) } },
};

const _Error401: ResponseConfig = {
  description: ERROR_MAP[401].message,
  content: { 'application/json; charset=utf-8': { schema: _ErrorSchema(401) } },
};

const _Error404: ResponseConfig = {
  description: ERROR_MAP[404].message,
  content: { 'application/json; charset=utf-8': { schema: _ErrorSchema(404) } },
};

const _Error406: ResponseConfig = {
  description: ERROR_MAP[406].message,
  content: { 'application/json; charset=utf-8': { schema: _ErrorSchema(406) } },
};

const _Error500: ResponseConfig = {
  description: ERROR_MAP[500].message,
  content: { 'application/json; charset=utf-8': { schema: _ErrorSchema(500) } },
};

const _ErrorHealth503: ResponseConfig = {
  description: ERROR_MAP[503].message,
  content: {
    'application/health+json; charset=utf-8': {
      schema: z.object({
        status: z.string().openapi({ example: 'fail' }),
        message: z.string().openapi({ example: 'failed to connect' }),
        details: _ErrorSchema(503),
      }),
    },
  },
};

export const GETErrorResponses: { [statusCode: string]: ResponseConfig } = {
  400: _Error400,
  401: _Error401,
  404: _Error404,
  500: _Error500,
};
export const POSTErrorResponses: { [statusCode: string]: ResponseConfig } = {
  400: _Error400,
  401: _Error401,
  500: _Error500,
};

export const AuthErrorResponses: { [statusCode: string]: ResponseConfig } = {
  400: _Error400,
  401: _Error401,
  500: _Error500,
};

export const HealthErrorResponse: { [statusCode: string]: ResponseConfig } = {
  503: _ErrorHealth503,
};
