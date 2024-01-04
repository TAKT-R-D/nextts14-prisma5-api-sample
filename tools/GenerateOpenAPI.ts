import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi';
import { Ex } from '@/schemas/config/Commons';
import {
  DocumentConfig,
  SecurityComponent,
  XApiVersionHeaderComponent,
  XTotalCountHeaderComponent,
} from './openapi/Configs';
import { entries } from './openapi/EntryPoints';

const main = async () => {
  require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
  });
  const registry = new OpenAPIRegistry();
  extendZodWithOpenApi(z);

  // securityScheme
  registry.registerComponent(
    SecurityComponent.type,
    SecurityComponent.name,
    SecurityComponent.component
  );

  // headers
  const headerVersion = registry.registerComponent(
    XApiVersionHeaderComponent.type,
    XApiVersionHeaderComponent.name,
    XApiVersionHeaderComponent.component
  );
  const headerCount = registry.registerComponent(
    XTotalCountHeaderComponent.type,
    XTotalCountHeaderComponent.name,
    XTotalCountHeaderComponent.component
  );
  // params
  const IntIdSchema = registry.registerParameter(
    'IntId',
    z.number().openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      ...Ex.number,
    })
  );
  const CuidIdSchema = registry.registerParameter(
    'CuidId',
    z.string().openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      ...Ex.cuid,
    })
  );

  entries.forEach((entry) => {
    let path = { ...entry.schema };
    if (entry.requireAuth === true) {
      path = {
        ...path,
        security: [{ [SecurityComponent.name]: [] }],
      };
    }
    if (entry.slugIdType) {
      path.request = {
        ...path.request,
        params: z.object({
          id: entry.slugIdType === 'cuid' ? CuidIdSchema : IntIdSchema,
        }),
      };
    }
    Object.keys(path.responses).forEach((key) => {
      if (key === '200' && entry.isMultiLines === true) {
        path.responses[key].headers = {
          'x-api-version': headerVersion.ref,
          'x-total-count': headerCount.ref,
        };
      } else {
        path.responses[key].headers = {
          'x-api-version': headerVersion.ref,
        };
      }
    });

    registry.registerPath(path);
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  let obj: any = generator.generateDocument(DocumentConfig);

  if (process.env.API_VERSION) {
    obj.info.version = process.env.API_VERSION;
  }
  // MEMO: manually add example on slugId schema. reconsider when zod-to-openapi support 3.0.0
  if (obj.components?.parameters && obj.components?.schemas) {
    if (obj.components.parameters.IntId && obj.components.schemas.IntId) {
      obj.components.parameters.IntId.example =
        obj.components.schemas.IntId.example;
    }
    if (obj.components.parameters.CuidId && obj.components.schemas.CuidId) {
      obj.components.parameters.CuidId.example =
        obj.components.schemas.CuidId.example;
    }
  }

  const json = JSON.stringify(obj, null, 2);
  const file = __dirname + '/../public/openapi.json';
  fs.writeFileSync(file, json);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
