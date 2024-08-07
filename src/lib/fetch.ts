import { GoogleApiError, type GoogleApiErrorResponse } from "@/errors/GoogleApiError.js";

/**
 * Fetches the JSON object response of a Tenor API endpoint.
 * @param endpoint The Tenor API endpoint to fetch.
 * @param parameters The parameters of the endpoint.
 * @returns The fetched JSON object response.
 */
export async function fetchJson<TEndpointResponse extends object>(
  endpoint:
    | "search"
    | "featured"
    | "categories"
    | "search_suggestions"
    | "autocomplete"
    | "trending_terms"
    | "registershare"
    | "posts",
  parameters: URLSearchParams,
) {
  const response = await fetch(
    `https://tenor.googleapis.com/v2/${endpoint}?${parameters.toString()}`,
  );

  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error(`${response.statusText} (${response.status.toString()})`);

  const responseJson = (await response.json()) as GoogleApiErrorResponse | TEndpointResponse;

  if ("error" in responseJson) throw new GoogleApiError(responseJson.error);

  return responseJson;
}
