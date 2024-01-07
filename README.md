# RESTful API by Next.ts - Prisma Sample

## Summary

RESTful API Sample by `Next.js ver.14 (TypeScript)`, `PostgreSQL ver.16` and `Prism ver.5`.
Main features:

- Bearer authentication
- CORS
- Type safe by Zod
- Generate some required documents
  - ER-Diagram
  - DBML
  - API Specification (OpenAPI)
  - Licenses list of dependencies
- Dockerized
  - OpenSSL 3.x support
- Testing by dredd

## System Requirements

- node: 20.10.0
- yarn: 1.22.19
- next.js: 14.0.4
- prisma: 5.7.1
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

edit: `prisma/schema.prisma`

```zsh
npx prisma migrate dev
```

### Generate Zod types etc.

Comment out ERD generate setting on `.env`
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

- ER Diagram: `deliverables/ER-Diagram.svg`
- DBML: `deliverables/schema.dbml`
- Zod types: `src/schemas/zod/\*`

### Create Endpoint

```zsh
yarn scaffold
```

Answer questions and then followings will be generated/updated.
Module name must be same as model name in schema.prisma with lower and kebab case.

ex. user

```
.
├── src
│   ├── app/api
│   │   └── users
│   │       ├── [id]
│   │       │   └── route.ts
│   │       └── route.ts
│   └── schemas
│       └── config
│           ├── models
│           │   └── UserSchema.ts
│           ├── ExtendedModels.ts
│           └── index.ts
└── tools/openapi
    └── EntryPoinst.ts
```

### Edit src/schemas/ExtendedModels.ts for OpenAPI document

This file extends generated Zod types model schemas for OpenAPI document.
Basically, just adding description and example.

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

Configure `_requestPostSchema`, `_requestPutSchema`, `_responseSchema` with zod grammer.
Do not import between shemas under `src/schemas/config/models`. it will cause reference errors when building application.

#### OpenAPI path configuration section

Edit path, summary, description, tags...

add new tags on `src/schemas/config/Commons.ts > DocumentConfig > tags`.

### Generate openapi.json

```zsh
yarn openapi:generate
```

`public/openapi.json` will be updated.

Basic document settings are in `src/schemas/config/Commons.ts`. Edit as you needed.

You can see API specification at http://localhost:3000/docs

### Generate LICENSE List of dependencies

```zsh
yarn license:generate
```

`src/app/licenses/licenses.json` will be updated.
Check only packages for production without their dependencies(`package.json > dependencies`).

You can see License list at http://localhost:3000/licenses

### Testing

Make sure api/db are running.

```zsh
yarn test:dredd
```

Testing by dredd, GET Methods only as default.
If you want to test POST, PUT and DELETE methods, edit `tests/hook.js`.

## For your security

Do not deploy or open access `/docs` and `/openapi.json` on your production, if your api is private.

## Custom Commands

- `yarn start:standalone`: Start `standalone` build application on local.
- `yarn scaffold`: Generate new endpoints
- `yarn openapi:generate`: Generate openapi.json
- `yarn license:generate`: Generate License list
- `yarn test:dredd`: Test APIs
- `yarn prisma db seed`: Seed data to Database

## Run with Docker

- `docker-compose.yml`: APP + DB for local
- `docker-compose.db.yml`: DB for local
- `docker-compose.app.yml`: APP for local/production
- `docker-compose.app-arm64.yml`: APP for production, build by ARM64 machine and depoy to AMD64 platform such as AWS

APP containers support `OpenSSL 3.0`.

## Quick Start

Creat your own API using example option.

```zsh
yarn create next-app --example https://github.com/TAKT-R-D/nextts14-prisma5-api-sample/tree/template my-app
cd my-app
cp .env.example .env
docker compose -f docker-compose.db.yml up -d
npx prisma migrate dev
yarn dev # or yarn start:standalone
```

## Notes

Access Control, such as `Basic Authentication`, `Allowed Origin`, `Allowed IP` etc., is recommended to configure on your server, not on your application. `https` schema as well.

Authentication secret keys in `.env` is not secure. Use some Secrets Manager.

If you need a database design as one of deliverables, try to generate it by for example `tbls`.
You can see sample database design [here](./deliverables/dbdoc/README.md).
