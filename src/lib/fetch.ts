import { GoogleApiError, type GoogleApiErrorResponse } from "@/errors/GoogleApiError.js";

/**
 * Fetches the provided endpoint of Tenor's API with the provided URL parameters.
 * @param endpoint The endpoint of Tenor's API to fetch.
 * @param urlParameters The URL parameters of the endpoint.
 * @returns The JSON data response of the endpoint of Tenor's API.
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
  urlParameters: URLSearchParams,
) {
  const response = await fetch(
    `https://tenor.googleapis.com/v2/${endpoint}?${urlParameters.toString()}`,
  );

  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error(`${response.statusText} (${response.status.toString()})`);

  const responseJson = (await response.json()) as GoogleApiErrorResponse | TEndpointResponse;

  if ("error" in responseJson) throw new GoogleApiError(responseJson.error);

  return responseJson;
}
