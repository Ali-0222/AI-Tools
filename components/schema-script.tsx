export function SchemaScript({ schema }: { schema: object | object[] | null }) {
  if (!schema || (Array.isArray(schema) && schema.length === 0)) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
