export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    SUCCESSFUL: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    CONFLICT: 400,
    INVALID_VALUE: 422,
    REPEATED_EMAIL: 409,
  };

  return statusHTTPMap[status] ?? 500;
}