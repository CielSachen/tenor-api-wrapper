import type { ErrorCodes } from "./errorCodes.js";

/**
 * This message has the same semantics as `google.rpc.Status`. It uses HTTP status code instead of
 * gRPC status code. It has extra fields `status` and `errors` for backward compatibility with
 * {@link https://developers.google.com/api-client-library Google API Client Libraries}.
 *
 * _Converted from Protocol Buffers to TypeScript._
 * @see {@link https://cloud.google.com/apis/design/errors#http_mapping Google Cloud APIs ErrorDocumentation}
 */
export interface Status<TStatus extends keyof ErrorCodes = keyof ErrorCodes> {
  /** The HTTP status code that corresponds to `google.rpc.Status.code`. */
  readonly code: ErrorCodes[TStatus];
  /** This corresponds to `google.rpc.Status.message`. */
  readonly message: string;
  /** This is the enum version for `google.rpc.Status.code`. */
  readonly status?: TStatus;
  /** This corresponds to `google.rpc.Status.details`. */
  readonly details?: readonly Record<string, unknown>[];
}

/**
 * This message defines the error schema for Google's JSON HTTP APIs.
 *
 * _Converted from Protocol Buffers to TypeScript._
 * @see {@link https://cloud.google.com/apis/design/errors#http_mapping Google Cloud APIs ErrorDocumentation}
 */
export interface GoogleError<TStatus extends keyof ErrorCodes = keyof ErrorCodes> {
  /**
   * The actual error payload. The nested message structure is for backward compatibility with
   * {@link https://developers.google.com/api-client-library Google API Client Libraries}. It also
   * makes the error more readable to developers.
   */
  readonly error: Status<TStatus>;
}

/** Represents a Google API error object. */
export class GoogleApiError<TStatus extends keyof ErrorCodes = keyof ErrorCodes>
  extends Error
  implements Omit<Status<TStatus>, "message">
{
  /** The HTTP status code that corresponds to `google.rpc.Status.code`. */
  public readonly code;
  /** This is the enum version for `google.rpc.Status.code`. */
  public readonly status?;
  /** This corresponds to `google.rpc.Status.details`. */
  public readonly details?;

  /**
   * Constructs a new instance of a Google API error object.
   * @param error The actual error payload.
   */
  constructor(error: Status<TStatus>) {
    super(error.message);

    this.name = "GoogleApiError";
    this.code = error.code;
    this.status = error.status;
    this.details = error.details;
  }
}
