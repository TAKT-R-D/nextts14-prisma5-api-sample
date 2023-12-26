'use client';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './swagger-ui.css';

export default function APISpecification() {
  return (
    <>
      <title>API Specification</title>
      <main>
        <SwaggerUI url="/openapi.json" />
      </main>
    </>
  );
}
