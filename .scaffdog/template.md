---
name: 'API'
root: './'
output: '**/*'
ignore: []
questions:
  module: 'Enter module name(singular and kebab like item-category)'
  tag: 'Enter tag name such as user'
  isIdNumber:
    confirm: 'Is type of id number? (if cuid, then no)'
  isAuthRequired:
    confirm: 'Is auth required api?'
---

# `src/app/api/{{ inputs.module | plur }}/route.ts`

```ts
{{- module := inputs.module -}}
{{- modulep := inputs.module | pascal -}}

import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/Prisma';
import { getPrismaFindManyQuery } from '@/lib/BuildPrismaQuery';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';
import { handleZodError } from '@/lib/ZodErrorHandler';
import { ERROR_MAP } from '@/lib/ErrorMessages';
import {
  {{ modulep }}CreateInputSchema as CreateInputSchema,
  {{ modulep }}FindManyArgsSchema as FindManyArgsSchema,
  type {{ modulep }} as RequestType,
} from '@/schemas/zod';
import {
  {{ modulep }}PrismaInclude as PrismaInclude,
  {{ modulep }}PrismaSelect as PrismaSelect,
  format{{ modulep }}Params,
} from '@/schemas/config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const findQuery = await getPrismaFindManyQuery(
    PrismaSelect,
    PrismaInclude,
    searchParams
  );

  // validate query
  const query = FindManyArgsSchema.safeParse(findQuery);
  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ error: errorObject }, { status: errorCode });
  }

  let statusCode = 200;
  const res = await prisma.{{ module }}
    .findMany(query.data)
    .then((res) => {
      if (!res) {
        statusCode = 404;
        return { error: ERROR_MAP[404] };
      } else {
        return res;
      }
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });
  const totalCount = await prisma.{{ module }}.aggregate({ _count: true });

  return NextResponse.json(res, {
    headers: {
      'x-total-count': String(totalCount._count),
    },
    status: statusCode,
  });
}

export async function POST(request: Request) {
  const requestBody: Partial<RequestType> = await request
    .json()
    .catch(() => {});

  const params = format{{ modulep }}Params(requestBody);
  const query = CreateInputSchema.safeParse(params);

  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ error: errorObject }, { status: errorCode });
  }

  let statusCode = 200;

  const res = await prisma.{{ module }}
    .create({
      data: query.data,
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });

  return NextResponse.json(res, { status: statusCode });
}

```

# `src/app/api/{{ inputs.module | plur }}/[id]/route.ts`

```ts
{{- module := inputs.module -}}
{{- modulep := inputs.module | pascal -}}

import { NextResponse } from 'next/server';
import { getPrismaFindUniqueQuery } from '@/lib/BuildPrismaQuery';
import { ERROR_MAP } from '@/lib/ErrorMessages';
import { prisma } from '@/lib/Prisma';
import { handlePrismaError } from '@/lib/PrismaErrorHandler';
import { validateSlugParameters } from '@/lib/SchemaValidator';
import { handleZodError } from '@/lib/ZodErrorHandler';
import {
  {{ modulep }}FindUniqueArgsSchema as FindUniqueArgsSchema,
  {{ modulep }}UpdateInputSchema as UpdateInputSchema,
  {{ modulep }}WhereUniqueInputSchema as WhereUniqueInputSchema,
  type {{ modulep }} as RequestType,
} from '@/schemas/zod';
import {
  {{ modulep }}PrismaInclude as PrismaInclude,
  {{ modulep }}PrismaSelect as PrismaSelect,
  format{{ modulep }}Params,
} from '@/schemas/config';

type Props = {
  params: {
    id: string;
  };
};

async function _validateSlugParameters(id: string) {
  return await validateSlugParameters(WhereUniqueInputSchema, {{ if inputs.isIdNumber }}+{{ end }}id);
}

export async function GET(request: Request, { params: { id } }: Props) {
  let findQuery = await getPrismaFindUniqueQuery(PrismaSelect, PrismaInclude);
  const { success, error, where } = await _validateSlugParameters(id);
  if (success === false) {
    return NextResponse.json({ error }, { status: 400 });
  } else {
    findQuery = { ...findQuery, where };
  }

  // validate query
  const query = FindUniqueArgsSchema.safeParse(findQuery);
  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json(
      { ...ERROR_MAP[errorCode], errors: errorObject },
      { status: errorCode }
    );
  }

  let statusCode = 200;
  const res = await prisma.{{ module }}
    .findUnique(query.data)
    .then((res) => {
      if (!res) {
        statusCode = 404;
        return { error: ERROR_MAP[404] };
      } else {
        return res;
      }
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });

  return NextResponse.json(res, { status: statusCode });
}

export async function PUT(request: Request, { params: { id } }: Props) {
  const { success, error, where } = await _validateSlugParameters(id);
  if (success === false) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const requestBody: Partial<RequestType> = await request
    .json()
    .catch(() => {});

  const params = format{{ modulep }}Params(requestBody);
  const query = UpdateInputSchema.safeParse(params);

  if (query.success === false) {
    const { errorCode, errorObject } = handleZodError(query.error);
    return NextResponse.json({ error: errorObject }, { status: errorCode });
  }

  let statusCode = 200;

  const res = await prisma.{{ module }}
    .update({
      where,
      data: query.data,
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });

  return NextResponse.json(res, { status: statusCode });
}

export async function DELETE(request: Request, { params: { id } }: Props) {
  const { success, error, where } = await _validateSlugParameters(id);
  if (success === false) {
    return NextResponse.json({ error }, { status: 400 });
  }

  let statusCode = 204;

  const res = await prisma.{{ module }}
    .delete({
      where,
    })
    .then(() => {
      return null;
    })
    .catch((err) => {
      const { errorCode, errorObject } = handlePrismaError(err);
      statusCode = errorCode;
      return { error: errorObject };
    });

  if (statusCode === 204) {
    return new Response(null, { status: 204 });
  } else {
    return NextResponse.json(res, { status: statusCode });
  }
}

```

# `src/schemas/config/ExtendedModels.ts`

```ts
{{- module := inputs.module -}}
{{- modulep := inputs.module | pascal -}}
{{- file := read output.abs -}}
{{- head := file | before "import { Ex } from './Commons';" 0 -}}
{{- body := file | after "import { Ex } from './Commons';" -1 -}}

{{ head }}
import { {{ modulep }}Schema } from '@/schemas/zod';
{{ body }}
// TODO: add description and example
export const {{ modulep }}ModelSchema = {{ modulep }}Schema.extend({
  id: {{ modulep }}Schema.shape.id.describe('{{ module }} id').openapi(Ex.{{ if inputs.isIdNumber }}number{{ else }}cuid{{ end }}),
  // xx: yy,
  createdAt: {{ modulep }}Schema.shape.createdAt
    .describe('created date')
    .openapi(Ex.date),
  updatedAt: {{ modulep }}Schema.shape.updatedAt
    .describe('updated date')
    .openapi(Ex.date),
})

```

# `src/schemas/config/models/{{ inputs.module | pascal }}Schema.ts`

```ts
{{- module := inputs.module -}}
{{- modulep := inputs.module | pascal -}}
{{- modules := inputs.module | plur -}}

import { z } from 'zod';
import * as builder from '@/schemas/BuildOpenApiSchema';
import { type {{ modulep }} as RequestType } from '@/schemas/zod';
import {
  Ex,
  {{ modulep}}ModelSchema as ModelSchema,
} from '@/schemas/config';

/**
 * PRISMA CONFIGS
 * *PrismaSelect: selected columns. if select all, leave it as {}
 * *PrismaInclude: included columns
 * format*Params: connect etc. if no relational post/put query, just return params.
 */

export const {{ modulep }}PrismaSelect = {};

// TODO: describe include
export const {{ modulep }}PrismaInclude = {};

// TODO: describe relation
export function format{{ modulep }}Params(params: Partial<RequestType>) {
  return params;
}

/**
 * OPENAPI CONFIGS
 * add describe & example
 *
 * _requestPostSchema: request body for POST request
 * _requestPutSchema: request body for PUT request. basically all are optional
 * _responseSchema: response body with relations
 */

// TODO: pick request params
const _requestPostSchema = ModelSchema.pick({
  // xx: true,
});

// TODO: extend params to optional
const _requestPutSchema = _requestPostSchema.extend({
  // xx: _requestPostSchema.shape.xxx.optional(),
});

// TODO: describe response with include
const _responseSchema = ModelSchema.merge(
  z.object({
    // xxx: yyyy
  })
);


/**
 * OPENAPI PATH CONFIG
 * path, summary, description, tags(user/cms), etc
 */

export const {{ modulep }}CreateSchema = builder.getCreateSchema(
  '/{{ modules }}',
  'create a {{ module }}',
  'create a {{ module }}',
  '{{ inputs.tag }}',
  _requestPostSchema,
  ModelSchema
);
export const {{ modulep }}FindManySchema = builder.getFindManySchema(
  '/{{ modules }}',
  'get {{ modules }} list',
  'get {{ modules }} list',
  '{{ inputs.tag }}',
  _responseSchema
);
export const {{ modulep }}FindUniqueSchema = builder.getFindUniqueSchema(
  '/{{ modules }}/{id}',
  'get a {{ module }}',
  'get a {{ module }} by id',
  '{{ inputs.tag }}',
  _responseSchema,
);
export const {{ modulep }}UpdateSchema = builder.getUpdateSchema(
  '/{{ modules }}/{id}',
  'update a {{ module }}',
  'update a {{ module }} by id',
  '{{ inputs.tag }}',
  _requestPutSchema,
  ModelSchema,
);
export const {{ modulep }}DeleteSchema = builder.getDeleteSchema(
  '/{{ modules }}/{id}',
  'delete a {{ module }}',
  'delete a {{ module }} by id',
  '{{ inputs.tag }}',
);

```

# `src/schemas/config/index.ts`

```ts
{{- body := read output.abs | before 0 -}}

{{ body }}
export * from './models/{{ inputs.module | pascal }}Schema';

```

# `src/schemas/EntryPoints.ts`

```ts
{{- body := read output.abs | before -1 -}}

{{ body }}
  { schema: schm.{{ inputs.module | pascal }}CreateSchema, requireAuth: {{ if inputs.isAuthRequired }}true{{ else }}false{{ end }}, isMultiLines: false },
  { schema: schm.{{ inputs.module | pascal }}FindManySchema, requireAuth: {{ if inputs.isAuthRequired }}true{{ else }}false{{ end }}, isMultiLines: true },
  { schema: schm.{{ inputs.module | pascal }}FindUniqueSchema, requireAuth: {{ if inputs.isAuthRequired }}true{{ else }}false{{ end }}, isMultiLines: false, slugIdType: {{ if inputs.isIdNumber }}'int'{{ else }}'cuid'{{ end }} },
  { schema: schm.{{ inputs.module | pascal }}UpdateSchema, requireAuth: {{ if inputs.isAuthRequired }}true{{ else }}false{{ end }}, isMultiLines: false, slugIdType: {{ if inputs.isIdNumber }}'int'{{ else }}'cuid'{{ end }} },
  { schema: schm.{{ inputs.module | pascal }}DeleteSchema, requireAuth: {{ if inputs.isAuthRequired }}true{{ else }}false{{ end }}, isMultiLines: false, slugIdType: {{ if inputs.isIdNumber }}'int'{{ else }}'cuid'{{ end }} },
];

```
