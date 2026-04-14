const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    if (body?.error) {
      throw new ApiError(body.error.code, body.error.message, body.error.status);
    }
    throw new ApiError("UNKNOWN", res.statusText, res.status);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  /** Like get, but returns fallback instead of throwing on failure. */
  getSafe: <T>(path: string, fallback: T): Promise<T> =>
    request<T>(path).catch(() => fallback),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
};
