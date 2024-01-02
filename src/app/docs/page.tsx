'use client';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import './swagger-ui.css';

const DynamicSwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <p>Loading Component...</p>,
});

export default function APISpecification() {
  return (
    <>
      <title>API Specification</title>
      <main>
        <DynamicSwaggerUI url="/openapi.json" />
      </main>
    </>
  );
}
