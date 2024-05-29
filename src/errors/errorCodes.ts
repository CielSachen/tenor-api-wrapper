export const errorCodes = Object.freeze({
  /** No error. */
  OK: 200,
  /**
   * Client specified an invalid argument. Check error message and error details for more
   * information.
   */
  INVALID_ARGUMENT: 400,
  /**
   * Request can not be executed in the current system state, such as deleting a non-empty
   * directory.
   */
  FAILED_PRECONDITION: 400,
  /** Client specified an invalid range. */
  OUT_OF_RANGE: 400,
  /** Request not authenticated due to missing, invalid, or expired OAuth token. */
  UNAUTHENTICATED: 401,
  /**
   * Client does not have sufficient permission. This can happen because the OAuth token does not
   * have the right scopes, the client doesn't have permission, or the API has not been enabled.
   */
  PERMISSION_DENIED: 403,
  /** A specified resource is not found. */
  NOT_FOUND: 404,
  /** Concurrency conflict, such as read-modify-write conflict. */
  ABORTED: 409,
  /** The resource that a client tried to create already exists. */
  ALREADY_EXISTS: 409,
  /**
   * Either out of resource quota or reaching rate limiting. The client should look for
   * `google.rpc.QuotaFailure` error detail for more information.
   */
  RESOURCE_EXHAUSTED: 429,
  /** Request cancelled by the client. */
  CANCELLED: 499,
  /** Unrecoverable data loss or data corruption. The client should report the error to the user. */
  DATA_LOSS: 500,
  /** Unknown server error. Typically a server bug. */
  UNKNOWN: 500,
  /** Internal server error. Typically a server bug. */
  INTERNAL: 500,
  /** API method not implemented by the server. */
  NOT_IMPLEMENTED: 501,
  /** Service unavailable. Typically the server is down. */
  UNAVAILABLE: 503,
  /**
   * Request deadline exceeded. This will happen only if the caller sets a deadline that is shorter
   * than the method's default deadline (i.e. requested deadline is not enough for the server to
   * process the request) and the request did not finish within the deadline.
   */
  DEADLINE_EXCEEDED: 504,
});

type _errorCodes = typeof errorCodes;

/** @see {@link https://cloud.google.com/apis/design/errors#handling_errors} */
export interface ErrorCodes extends _errorCodes {}
