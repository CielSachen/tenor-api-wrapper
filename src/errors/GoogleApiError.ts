/**
 * Describes the error payload for Google's APIs.
 * @see {@link https://cloud.google.com/apis/design/errors#http_mapping}
 */
export interface GoogleApiErrorPayload {
  /**
   * The HTTP status code corresponding to the gRPC status code.
   * @see {@link https://cloud.google.com/apis/design/errors#handling_errors}
   */
  readonly code: number;
  /** The human-readable error message. */
  readonly message: string;
  /**
   * The gRPC status code of the error.
   * @see {@link https://cloud.google.com/apis/design/errors#handling_errors}
   */
  readonly status?: string;
  /** An array of objects containing additional details about the error. */
  readonly details?: readonly {
    readonly [key: string]: unknown;
    /** The resource name of the protocol buffer message. */
    readonly "@type": string;
  }[];
}

/**
 * Describes the error response of Google's APIs.
 * @see {@link https://cloud.google.com/apis/design/errors#http_mapping}
 */
export interface GoogleApiErrorResponse {
  /** The error's payload. */
  readonly error: GoogleApiErrorPayload;
}

/** Represents an error received from Google's APIs. */
export class GoogleApiError extends Error implements GoogleApiErrorPayload {
  /**
   * The HTTP status code corresponding to the gRPC status code.
   * @see {@link https://cloud.google.com/apis/design/errors#handling_errors}
   */
  readonly code;
  /**
   * The gRPC status code of this error.
   * @see {@link https://cloud.google.com/apis/design/errors#handling_errors}
   */
  readonly status?;
  /** An array of objects containing additional details about this error. */
  readonly details?;

  /** @param rawError This error's payload. */
  constructor(rawError: GoogleApiErrorPayload) {
    super(rawError.message);

    this.name = "GoogleApiError";
    this.code = rawError.code;
    this.status = rawError.status;
    this.details = rawError.details;
  }
}
