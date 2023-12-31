import { z } from 'zod';
import { RouteConfig, ResponseConfig } from '@asteasolutions/zod-to-openapi';
import {
  CommonQuery,
  GETErrorResponses,
  POSTErrorResponses,
  AuthErrorResponses,
  HealthErrorResponse,
} from '@/schemas/config/Commons';

type errorType = { [statusCode: string]: ResponseConfig };

// CRUD: CREATE
export function getCreateSchema(
  path: string,
  summary: string,
  description: string,
  tag: string,
  requestSchema: z.AnyZodObject,
  responseSchema: z.AnyZodObject,
  createErrors?: errorType | undefined
): RouteConfig {
  const errors = createErrors ? createErrors : POSTErrorResponses;
  return {
    method: 'post',
    path,
    summary,
    description,
    request: {
      body: {
        content: {
          'application/json': { schema: requestSchema },
        },
      },
    },
    responses: {
      200: {
        description: 'success',
        content: {
          'application/json': { schema: responseSchema },
        },
      },
      ...errors,
    },
    tags: [tag],
  };
}

// CRUD: READ
export function getFindManySchema(
  path: string,
  summary: string,
  description: string,
  tag: string,
  responseSchema: z.AnyZodObject,
  findQuery?: z.AnyZodObject | undefined,
  findErrors?: errorType | undefined
): RouteConfig {
  const query = findQuery ? findQuery : CommonQuery;
  const errors = findErrors ? findErrors : GETErrorResponses;

  return {
    method: 'get',
    path,
    summary,
    description,
    request: { query },
    responses: {
      200: {
        description: 'success',
        content: {
          'application/json': { schema: z.array(responseSchema) },
        },
      },
      /* -> no recodes, then return 404
      204: {
        description: 'No Content',
      },
      */
      ...errors,
    },
    tags: [tag],
  };
}

export function getFindUniqueSchema(
  path: string,
  summary: string,
  description: string,
  tag: string,
  responseSchema: z.AnyZodObject,
  idSchema: z.AnyZodObject,
  findErrors?: errorType | undefined
): RouteConfig {
  const errors = findErrors ? findErrors : GETErrorResponses;

  return {
    method: 'get',
    path,
    summary,
    description,
    request: {
      params: idSchema,
    },
    responses: {
      200: {
        description: 'success',
        content: {
          'application/json': { schema: responseSchema },
        },
      },
      /* -> no recodes, then return 404
      204: {
        description: 'No Content',
      },
      */
      ...errors,
    },
    tags: [tag],
  };
}

// CRUD: UPDATE
export function getUpdateSchema(
  path: string,
  summary: string,
  description: string,
  tag: string,
  requestSchema: z.AnyZodObject,
  responseSchema: z.AnyZodObject,
  idSchema: z.AnyZodObject,
  createErrors?: errorType | undefined
): RouteConfig {
  const errors = createErrors ? createErrors : POSTErrorResponses;
  return {
    method: 'put',
    path,
    summary,
    description,
    request: {
      params: idSchema,
      body: {
        content: {
          'application/json': { schema: requestSchema },
        },
      },
    },
    responses: {
      200: {
        description: 'success',
        content: {
          'application/json': { schema: responseSchema },
        },
      },
      ...errors,
    },
    tags: [tag],
  };
}

// CRUD: DELETE
export function getDeleteSchema(
  path: string,
  summary: string,
  description: string,
  tag: string,
  idSchema: z.AnyZodObject,
  createErrors?: errorType | undefined
): RouteConfig {
  const errors = createErrors ? createErrors : POSTErrorResponses;
  return {
    method: 'delete',
    path,
    summary,
    description,
    request: {
      params: idSchema,
    },
    responses: {
      204: {
        description: 'No Content',
      },
      ...errors,
    },
    tags: [tag],
  };
}

// AUTH
export function getAuthSchema(
  path: string,
  summary: string,
  description: string,
  requestSchema: z.AnyZodObject,
  responseSchema: z.AnyZodObject
): RouteConfig {
  return {
    method: 'post',
    path,
    summary,
    description,
    request: {
      body: {
        content: {
          'application/json': { schema: requestSchema },
        },
      },
    },
    responses: {
      200: {
        description: 'success',
        content: {
          'application/json': { schema: responseSchema },
        },
      },
      ...AuthErrorResponses,
    },
    tags: ['auth'],
  };
}
// HEALTH
export function getHealthSchema(
  path: string,
  summary: string,
  description: string,
  responseSchema: z.AnyZodObject
): RouteConfig {
  return {
    method: 'get',
    path,
    summary,
    description,
    responses: {
      200: {
        description: 'success',
        content: {
          'application/health+json': { schema: responseSchema },
        },
      },
      ...HealthErrorResponse,
    },
  };
}
