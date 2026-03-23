export { AppError } from "./AppError.js";
export { mapPrismaError, mapMongooseError, mapRedisError } from "./mappers.js";
export type { ErrorCode, AppErrorOptions } from "./AppError.js";

export {
    // 400
    ValidationError,
    InvalidParamsError,
    // 401
    UnauthorizedError,
    TokenExpiredError,
    TokenInvalidError,
    RefreshTokenInvalidError,
    // 403
    ForbiddenError,
    // 404
    NotFoundError,
    // 409
    AlreadyExistsError,
    ConflictError,
    // Domenowe CMMS
    AssetNotAvailableError,
    WorkOrderAlreadyClosedError,
    InsufficientStockError,
    // 500
    InternalServerError,
    DatabaseError,
    ExternalServiceError,
    // Factory
    toAppError,
} from "./HttpErrors.js";
