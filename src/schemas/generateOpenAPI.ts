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
  // tags

  entries.forEach((entry) => {
    let path = { ...entry.schema };
    if (entry.requireAuth === true) {
      path = {
        ...path,
        security: [{ [SecurityComponent.name]: [] }],
      };
    }
    if (entry.isMultiLines === true) {
      path.responses[200].headers = { 'x-total-count': headers.ref };
    }

    registry.registerPath(path);
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  const obj = generator.generateDocument(DocumentConfig);

  const json = JSON.stringify(obj, null, 2);
  const file = __dirname + '/../../public/openapi.json';
  fs.writeFileSync(file, json);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
