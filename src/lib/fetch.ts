import { type Error, GoogleApiError } from "@errors";

/**
 * Fetches the JSON object response of a Tenor API endpoint.
 * @param endpoint The API endpoint.
 * @param parameters The query string parameters.
 * @returns The fetched JSON object response.
 */
export async function fetchJson<T extends object>(endpoint: string, parameters: URLSearchParams) {
  const response = await fetch(
    `https://tenor.googleapis.com/v2/${endpoint}?${parameters.toString()}`,
  );

  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error(`${response.statusText} (${response.status.toString()})`);

  const responseJson = (await response.json()) as Error | T;

  if ("error" in responseJson) throw new GoogleApiError(responseJson.error);

  return responseJson;
}
