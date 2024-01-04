//import { z } from 'zod';
//import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
//extendZodWithOpenApi(z);

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

export const DocumentConfig = {
  openapi: '3.0.0',
  info: {
    title: 'API Specification',
    version: `x.x.x`,
    description: 'This is a sample API specification.',
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
    description: 'Total number of items in the collection.',
    schema: {
      type: 'integer',
      example: 123,
    },
  },
};

export const XApiVersionHeaderComponent: {
  type: any; // ComponentTypeKey
  name: string;
  component: any;
} = {
  type: 'headers',
  name: 'x-api-version',
  component: {
    description: 'api version',
    schema: {
      type: 'string',
      example: '0.1.0',
    },
  },
};
