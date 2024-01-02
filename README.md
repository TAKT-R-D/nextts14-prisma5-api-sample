# RESTful API by Next.ts - Prisma Sample

## Summary

RESTful API Sample by `Next.js ver.14 (TypeScript)`, `PostgreSQL ver.12` and `Prism ver.5`.
Main features:

- Bearer authentication
- CORS
- Type safe by Zod
- Generate some required documents
  - ER-Diagram
  - DBML
  - API Specification (OpenAPI)
- Dockerized
  - OpenSSL 3.x support

## System Requirements

- node: 20.10.0
- yarn: 1.22.19
- next.js: 14.0.4
- prisma: 5.7.0
- seemore package.json

## Installation

```zsh
yarn install
cp .env.sample .env
npx prisma generate
```

## Run at your local machine

```zsh
yarn dev
```

or

```zsh
yarn start:standalone
```

and then access http://localhost:3000

### with docker

```zsh
docker compose build
docker compose up -d
```

## Implementation Steps

### Define prisma schema

edit: prisma/schema.prisma

```zsh
npx prisma migrate dev
```

### Generate Zod types etc.

comment out ERD generate setting on .env
This setting is for docker build.

```text:.env
...
#DISABLE_ERD=true
...
```

```zsh
npx prisma generate
```

Followings will be generated

- ER Diagram: prisma/exports/ER-Diagram.svg
- DBML: prisma/exports/schema.dbml
- Zod types: src/schemas/zod/\*

### Create Endpoint

```zsh
yarn scaffold
```

answer questions and then followings will be generated/updated.
module name must be same as model name in schema.prisma with lower and kebab case.

ex. user

```
src
├── app/api
│   └── users
│       ├── [id]
│       │   └── route.ts
│       └── route.ts
└── schemas
    ├── config
    │   ├── models
    │   │   └── UserSchema.ts
    │   ├── ExtendedModels.ts
    │   └── index.ts
    └── EntryPoints.ts
```

### Edit src/schemas/ExtendedModels.ts for OpenAPI document

This file extends generated Zod types model schemas for OpenAPI document.
basically, only add description and example.

### Edit src/schemas/config/models/XxxxSchema.ts

#### Prisma query configuration section

`XxxxPrismaSelect`, `XxxxPrismaInclude`, `formatXxxxParams` are for prisma query called by `route.ts`.

formatXxxxParams defines relation query.

ex.

```ts
export function formatPostParams(params: Partial<RequestType>) {
  const { authorId, ...rest } = params;
  let formattedParams: any = { ...rest };
  if (authorId) {
    formattedParams = {
      ...formattedParams,
      author: { connect: { id: authorId } },
    };
  }
  return formattedParams;
}
```

#### OpenAPI configuration section

configure `_requestPostSchema`, `_requestPutSchema`, `_responseSchema` with zod grammer.
do not import between shemas under `src/schemas/config/models`. it will cause reference errors when building application.

#### OpenAPI path configuration section

edit path, summary, description, tags...

add new tags on `src/schemas/config/Commons.ts:DocumentConfig/tags`.

### Generate openapi.json

```zsh
yarn openapi:generate
```

`public/openapi.json` will be updated.

basic document settings are in `src/schemas/config/Commons.ts`. Edit as you needed.

you can see API specification at http://localhost:3000/docs

## For your security

Do not deploy or open access `/docs` and `/openapi.json` on your production.
