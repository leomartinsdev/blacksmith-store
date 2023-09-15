export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    SUCCESSFUL: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    CONFLICT: 422,
    INVALID_VALUE: 400,
    UNAUTHORIZED: 401,
  };

  return statusHTTPMap[status] ?? 500;
}