interface Options extends RequestInit {
  timeout?: number
}

const DEFAULT_TIMEOUT = 5_000;

export default async function fetchWithTimeout(resource: RequestInfo, options?: Options) {
  const timeout = options && options.timeout ? options.timeout : DEFAULT_TIMEOUT;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response;
}
