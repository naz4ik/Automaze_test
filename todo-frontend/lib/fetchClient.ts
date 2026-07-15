const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data?: unknown,
): Promise<T> {
  const options: RequestInit = { method };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
    options.headers = { 'Content-Type': 'application/json' };
  }

  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => request<T>(url, 'POST', data),
  put: <T>(url: string, data?: unknown) => request<T>(url, 'PUT', data),
  delete: (url: string) => request<void>(url, 'DELETE'),
};