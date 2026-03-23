export type ErrorCode =
    // Auth
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "TOKEN_EXPIRED"
    | "TOKEN_INVALID"
    | "REFRESH_TOKEN_INVALID"
    // Validation
    | "VALIDATION_ERROR"
    | "INVALID_PARAMS"
    // Resources
    | "NOT_FOUND"
    | "ALREADY_EXISTS"
    | "CONFLICT"
    // Business logic
    | "ASSET_NOT_AVAILABLE"
    | "WORK_ORDER_ALREADY_CLOSED"
    | "INSUFFICIENT_STOCK"
    // Server
    | "INTERNAL_SERVER_ERROR"
    | "DATABASE_ERROR"
    | "EXTERNAL_SERVICE_ERROR";

export interface AppErrorOptions {
    message: string;
    statusCode: number;
    code: ErrorCode;
    details?: unknown;
    cause?: unknown;
}

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: ErrorCode;
    public readonly details?: unknown;
    public readonly isOperational: boolean;
    public readonly timestamp: string;

    constructor(options: AppErrorOptions) {
        super(options.message);

        this.name = this.constructor.name;
        this.statusCode = options.statusCode;
        this.code = options.code;
        this.details = options.details;
        this.isOperational = true;
        this.timestamp = new Date().toISOString();

        if (options.cause) {
            this.cause = options.cause;
        }

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            error: {
                code: this.code,
                message: this.message,
                details: this.details ?? undefined,
                timestamp: this.timestamp,
            },
        };
    }
}
