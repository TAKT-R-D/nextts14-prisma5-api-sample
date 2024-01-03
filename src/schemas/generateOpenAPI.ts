import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import {
  DocumentConfig,
  SecurityComponent,
  XTotalCountHeaderComponent,
} from './config/Commons';
import fs from 'fs';
import { entries } from './EntryPoints';
import { Ex } from './config/Commons';

const main = async () => {
  const registry = new OpenAPIRegistry();
  extendZodWithOpenApi(z);

  // securityScheme
  registry.registerComponent(
    SecurityComponent.type,
    SecurityComponent.name,
    SecurityComponent.component
  );

  // headers
  const headers = registry.registerComponent(
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
    if (entry.isMultiLines === true) {
      path.responses[200].headers = { 'x-total-count': headers.ref };
    }

    registry.registerPath(path);
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  let obj: any = generator.generateDocument(DocumentConfig);

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
  const file = __dirname + '/../../public/openapi.json';
  fs.writeFileSync(file, json);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
