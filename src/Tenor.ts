import { fetchJson } from "@/lib/fetch.js";

/**
 * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#format-typesTenor}
 */
export type CONTENT_FORMAT =
  | "gif"
  | "gifpreview"
  | "mediumgif"
  | "mediumgifpreview"
  | "tinygif"
  | "tinygifpreview"
  | "nanogif"
  | "nanogifpreview"
  | "mp4"
  | "loopedmp4"
  | "tinymp4"
  | "nanomp4"
  | "webm"
  | "tinywebm"
  | "nanowebm"
  | "webp_transparent"
  | "webppreview_transparent"
  | "tinywebp_transparent"
  | "tinywebppreview_transparent"
  | "nanowebp_transparent"
  | "nanowebppreview_transparent"
  | "gif_transparent"
  | "tinygif_transparent"
  | "nanogif_transparent";

/** {@link https://developers.google.com/tenor/guides/response-objects-and-errors#media-object} */
export interface MEDIA_OBJECT {
  /** A url to the media source. */
  readonly url: string;
  /** Width and height of the media in pixels. */
  readonly dims: number[];
  /**
   * Represents the time in seconds for one loop of the content. If the content is static, the
   * duration is set to `0`.
   */
  readonly duration: number;
  /** Size of file in bytes. */
  readonly size: number;
}

/**
 * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object}
 */
export interface RESPONSE_OBJECT {
  /** A Unix timestamp that represents when this post was created. */
  readonly created: number;
  /**
   * Returns `true` if this post contains audio.
   *
   * **Note:** Only video formats support audio. The GIF image file format can't contain audio
   * information.
   */
  readonly hasaudio: boolean;
  /** Tenor result identifier. */
  readonly id: string;
  /**
   * A dictionary with a
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#content-formats content format}
   * as the key and and a
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#media-object Media Object}
   * as the value.
   */
  readonly media_formats: Partial<Record<CONTENT_FORMAT, MEDIA_OBJECT>>;
  /** An array of tags for the post. */
  readonly tags: string[];
  /** The title of the post. */
  readonly title: string;
  /**
   * A textual description of the content.
   *
   * We recommend that you use `content_description` for user accessibility features.
   */
  readonly content_description: string;
  /** The full URL to view the post on {@link https://tenor.com tenor.com}. */
  readonly itemurl: string;
  /** Returns `true` if this post contains captions. */
  readonly hascaption: boolean;
  /**
   * Comma-separated list to signify whether the content is a sticker or static image, has audio, or
   * is any combination of these. If `sticker` and `static` aren't present, then the content is a
   * GIF. A blank `flags` field signifies a GIF without audio.
   */
  readonly flags: string[];
  /** The most common background pixel color of the content. */
  readonly bg_color: string;
  /** A short URL to view the post on {@link https://tenor.com tenor.com}. */
  readonly url: string;
}

/**
 * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#category-object}
 */
export interface CATEGORY_OBJECT {
  /**
   * The search term that corresponds to the category. The search term is translated to match the
   * `locale` of the corresponding request.
   */
  readonly searchterm: string;
  /** The search URL to request if the user selects the category. */
  readonly path: string;
  /** A URL to the media source for the category's example GIF. */
  readonly image: string;
  /**
   * Category name to overlay over the image. The name is translated to match the `locale` of the
   * corresponding request.
   */
  readonly name: string;
}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-search} */
export interface SearchParameters {
  /**
   * A client-specified string that represents the integration.
   *
   * A client key lets you use the same API key across different integrations but still be able to
   * differentiate them.
   *
   * For an app integration, use the same `client_key` value for all API calls.
   *
   * Any client custom behavior is triggered by the pairing of the `key` and `client_key`parameters.
   *
   * Doesn't have a default value.
   */
  client_key?: string;
  /**
   * Comma-separated list of non-GIF content types to filter the
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object response objects}.
   * By default, `searchfilter` returns GIF content only.
   *
   * Doesn't have a default value. The accepted values are `sticker`, `static`, and `-static`:
   *
   * - `searchfilter=sticker` returns both static and animated sticker content.
   * - `searchfilter=sticker,-static` returns only animated sticker content.
   * - `searchfilter=sticker,static` returns only static sticker content.
   * - For GIF content, either leave `searchfilter` blank or don't use it.
   */
  searchfilter?: "sticker" | "sticker,-static" | "sticker,static";
  /**
   * Specify the country of origin for the request. To do so, provide its two-letter
   * {@link https://en.wikipedia.org/wiki/ISO_3166-1#Codes ISO 3166-1} country code.
   *
   * The default value is `US`.
   * @default "US"
   * @see {@link https://en.wikipedia.org/wiki/ISO_3166-1#Codes}
   */
  country?: Uppercase<string>;
  /**
   * Specify the default language to interpret the search string. `xx` is the language's
   * {@link https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes ISO 639-1} language code,
   * while the optional `_YY` value is the two-letter
   * {@link https://en.wikipedia.org/wiki/ISO_3166-1#Codes ISO 3166-1} country code.
   *
   * You can use the country code that you provide in `locale` to differentiate between dialects of
   * the given language.
   *
   * The default value is `en_US`.
   * @default "en_US"
   * @see {@link https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes}
   * @see {@link https://en.wikipedia.org/wiki/ISO_3166-1#Codes}
   */
  locale?: Lowercase<string> | `${Lowercase<string>}_${Uppercase<string>}`;
  /**
   * Specify the content safety filter level.
   *
   * The default value is `off`. The accepted values are `off`, `low`, `medium`, and `high`.
   * @default "off"
   */
  contentfilter?: "off" | "low" | "medium" | "high";
  /**
   * Comma-separated list of GIF formats to filter the
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object response objects}.
   * By default, `media_filter` returns all formats for each Response Object.
   *
   * Example: `media_filter=gif,tinygif,mp4,tinymp4`
   *
   * Doesn't have a default value.
   * @example
   * { media_filter: "gif,tinygif,mp4,tinymp4" }
   */
  media_filter?: string;
  /**
   * Filter the
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object response objects}
   * to only include GIFs with aspect ratios that fit within the selected range.
   *
   * The default value is `all`. The accepted values are `all`, `wide`, and `standard`:
   *
   * - `all`: No constraints
   * - `wide`: 0.42 <= aspect ratio <= 2.36
   * - `standard`: 0.56 <= aspect ratio <= 1.78
   * @default "all"
   */
  ar_range?: "all" | "wide" | "standard";
  /**
   * Specify whether to randomly order the response. The default value is `false`, which orders the
   * results by Tenor's relevancy ranking.
   *
   * The accepted values are `true` and `false`.
   * @default "false"
   */
  random?: `${boolean}`;
  /**
   * Fetch up to the specified number of results.
   *
   * The default value is `20`, and the maximum value is `50`.
   * @default "20"
   */
  limit?: `${number}`;
  /**
   * Retrieve results that start at the position "value". Use a non-zero, non-empty value from
   * `next`, returned by the API response, to fetch the next set of results. `pos` isn't an index
   * and might be an `integer`, `float`, or a `string`.
   *
   * Doesn't have a default value.
   */
  pos?: string;
}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-featured} */
export interface FeaturedParameters extends Omit<SearchParameters, "random"> {}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-categories} */
export interface CategoriesParameters
  extends Pick<SearchParameters, "client_key" | "country" | "locale" | "contentfilter"> {
  /**
   * Determines the type of categories returned.
   *
   * The default value is featured. The accepted values are featured and trending.
   * @default
   * { type: "featured" }
   */
  type?: "featured" | "trending";
}

/**
 * {@link https://developers.google.com/tenor/guides/endpoints#parameters-categsearch-suggestionsories}
 */
export interface SearchSuggestionsParameters
  extends Pick<SearchParameters, "client_key" | "country" | "locale" | "limit"> {}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-autocomplete} */
export interface AutocompleteParameters extends SearchSuggestionsParameters {}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-trending-search} */
export interface TrendingSearchTermsParameters extends SearchSuggestionsParameters {}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-posts} */
export interface PostsParameters extends Pick<SearchParameters, "client_key" | "media_filter"> {}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-search} */
export interface SearchResponse {
  /**
   * A position identifier to use with the next API query, through the `pos` field, to retrieve the
   * next set of results. If there are no further results, `next` returns an empty string.
   */
  readonly next: string;
  /**
   * An array of
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object Response Objects}
   * that contains the most relevant content for the requested search term. The content is sorted by its relevancy Rank.
   */
  readonly results: RESPONSE_OBJECT[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-featured} */
export interface FeaturedResponse extends SearchResponse {
  /**
   * An array of Featured
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object response objects}.
   */
  readonly results: RESPONSE_OBJECT[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-categories} */
export interface CategoriesResponse {
  /**
   * An array of
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#category-object CATEGORY_OBJECTS}
   * where the `name` field has been translated into the `locale` language.
   */
  readonly tags: CATEGORY_OBJECT[];
}

/**
 * {@link https://developers.google.com/tenor/guides/endpoints#response-format-search-suggestions}
 */
export interface SearchSuggestionsResponse {
  /** An array of suggested search terms. */
  readonly results: string[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-autocomplete} */
export interface AutocompleteResponse extends SearchSuggestionsResponse {}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-trending-search} */
export interface TrendingSearchTermsResponse extends SearchSuggestionsResponse {
  /** An array of suggested search terms. The terms are sorted by their Trending Rank. */
  readonly results: string[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-posts} */
export interface PostsResponse {
  /**
   * An array of
   * {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object Response Objects}
   * that correspond to those passed in the `ids` list.
   */
  readonly results: RESPONSE_OBJECT[];
}

/** A wrapper for fetching Tenor's API endpoints. */
export class Tenor {
  #key: string;

  /** @param key The API key to use. */
  constructor(key: string) {
    this.#key = key;
  }

  /**
   * Fetches the `Search` endpoint of Tenor's API with the provided query and given parameters.
   * @param query The search term to use.
   * @param parameters The optional parameters to use.
   * @returns The JSON data response of the `Search` endpoint.
   * @see {@link https://developers.google.com/tenor/guides/endpoints#search}
   */
  public async fetchGifsByQuery(query: string, parameters?: SearchParameters) {
    return fetchJson<SearchResponse>(
      "search",
      new URLSearchParams({ key: this.#key, q: query, ...parameters }),
    );
  }
  /**
   * Fetches the `Featured` endpoint of Tenor's API with the given parameters.
   * @param parameters The optional parameters to use.
   * @returns The JSON data response of the `Featured` endpoint.
   * @see {@link https://developers.google.com/tenor/guides/endpoints#featured}
   */
  public async fetchFeaturedGifs(parameters?: FeaturedParameters) {
    return fetchJson<FeaturedResponse>(
      "featured",
      new URLSearchParams({ key: this.#key, ...parameters }),
    );
  }
  /**
   * Fetches the `Categories` endpoint of Tenor's API with the given parameters.
   * @param parameters The optional parameters to use.
   * @returns The JSON data response of the `Categories` endpoint.
   * @see {@link https://developers.google.com/tenor/guides/endpoints#categories}
   */
  public async fetchGifCategories(parameters?: CategoriesParameters) {
    return fetchJson<CategoriesResponse>(
      "categories",
      new URLSearchParams({ key: this.#key, ...parameters }),
    );
  }
  /**
   * Fetches the `Search Suggestions` endpoint of Tenor's API with the provided query and given
   * parameters.
   * @param query The search term to use.
   * @param parameters The optional parameters to use.
   * @returns The JSON data response of the `Search Suggestions` endpoint.
   * @see {@link https://developers.google.com/tenor/guides/endpoints#search-suggestions}
   */
  public async fetchSearchSuggestionsByQuery(
    query: string,
    parameters?: SearchSuggestionsParameters,
  ) {
    return fetchJson<SearchSuggestionsResponse>(
      "search_suggestions",
      new URLSearchParams({ key: this.#key, q: query, ...parameters }),
    );
  }
  /**
   * Fetches the `Autocomplete` endpoint of Tenor's API with the provided query and given
   * parameters.
   * @param query The partial search term to use.
   * @param parameters The optional parameters to use.
   * @returns The JSON data response of the `Autocomplete` endpoint.
   * @see {@link https://developers.google.com/tenor/guides/endpoints#autocomplete}
   */
  public async fetchAutocompleteByQuery(query: string, parameters?: AutocompleteParameters) {
    return fetchJson<AutocompleteResponse>(
      "autocomplete",
      new URLSearchParams({ key: this.#key, q: query, ...parameters }),
    );
  }
  /**
   * Fetches the `Trending Search Terms` endpoint of Tenor's API with the given parameters.
   * @param parameters The optional parameters to use.
   * @returns The JSON data response of the `Trending Search Terms` endpoint.
   * @see {@link https://developers.google.com/tenor/guides/endpoints#trending-search}
   */
  public async fetchTrendingSearchTerms(parameters?: TrendingSearchTermsParameters) {
    return fetchJson<TrendingSearchTermsResponse>(
      "trending_terms",
      new URLSearchParams({ key: this.#key, ...parameters }),
    );
  }
  /**
   * Fetches the `Posts` endpoint of Tenor's API with the provided IDs and given parameters.
   * @param ids The array of
   *     {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object response objects }
   *     IDs to use.
   * @param parameters The optional parameters to use.
   * @returns The JSON data response of the `Posts` endpoint.
   * @see {@link https://developers.google.com/tenor/guides/endpoints#posts}
   */
  public async fetchPostsById(ids: string, parameters?: PostsParameters) {
    return fetchJson<PostsResponse>(
      "posts",
      new URLSearchParams({ ids, key: this.#key, ...parameters }),
    );
  }
}
