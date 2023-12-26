import { z, AnyZodObject } from 'zod';
import {
  extendZodWithOpenApi,
  ResponseConfig,
} from '@asteasolutions/zod-to-openapi';

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
  secret: { example: 'YOUR_SECRET' },
  shortText: { example: 'YLorem ipsum dolor sit amet' },
  longText: {
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};

export const DocumentConfig = {
  openapi: '3.0.0',
  info: {
    title: 'API sample',
    version: '1.0.0',
    description: 'This is a sample API.',
    contact: { email: 'admin@example.com' },
    license: {
      name: 'MIT',
      url: 'https://example.com/license',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'develop',
    },
    {
      url: 'https://example.com/api',
      description: 'production',
    },
  ],
  tags: [
    { name: 'auth', description: 'Authorization API' },
    { name: 'user', description: 'User API' },
    //{ name: 'cms', description: 'CMS API' },
  ],
};

export const SecurityComponent: {
  type: any; // ComponentTypeKey
  name: string;
  component: any; // SecuritySchemeType
} = {
  type: 'securitySchemes',
  name: 'bearerAuth',
  component: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
};

export const XTotalCountHeaderComponent: {
  type: any; // ComponentTypeKey
  name: string;
  component: any;
} = {
  type: 'headers',
  name: 'x-total-count',
  component: {
    example: 123,
    type: 'integer',
    description: 'Total number of items in the collection.',
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

export const IdIntSchema: any = z.object({
  id: z.number().int().describe('user id').openapi(Ex.number),
});
export const IdCuidSchema: any = z.object({
  id: z.string().cuid().describe('user id').openapi(Ex.cuid),
});

// errors
const ErrorSchema = z.object({
  error: z.object({
    message: z.string().openapi(Ex.error),
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

const Error400: ResponseConfig = {
  description: 'Bad Request',
  content: { 'application/json': { schema: ErrorSchema } },
};

const Error401: ResponseConfig = {
  description: 'Unauthorized',
  content: { 'application/json': { schema: ErrorSchema } },
};

const Error404: ResponseConfig = {
  description: 'Not Found',
  content: { 'application/json': { schema: ErrorSchema } },
};

const Error406: ResponseConfig = {
  description: 'Not Acceptable',
  content: { 'application/json': { schema: ErrorSchema } },
};

const Error500: ResponseConfig = {
  description: 'Internal Server Error',
  content: { 'application/json': { schema: ErrorSchema } },
};

const ErrorHealth503: ResponseConfig = {
  description: 'Service Unavailable',
  content: {
    'application/health+json': {
      schema: z.object({
        status: z.string().openapi({ example: 'fail' }),
        message: z.string().openapi({ example: 'failed to connect' }),
        details: ErrorSchema,
      }),
    },
  },
};

export const GETErrorResponses: { [statusCode: string]: ResponseConfig } = {
  400: Error400,
  401: Error401,
  404: Error404,
  500: Error500,
};
export const POSTErrorResponses: { [statusCode: string]: ResponseConfig } = {
  400: Error400,
  401: Error401,
  500: Error500,
};

export const AuthErrorResponses: { [statusCode: string]: ResponseConfig } = {
  400: Error400,
  401: Error401,
  500: Error500,
};

export const HealthErrorResponse: { [statusCode: string]: ResponseConfig } = {
  503: ErrorHealth503,
};
