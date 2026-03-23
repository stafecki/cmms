import { Prisma } from "../generated/prisma/client.js";
import { MongooseError } from "mongoose";
import { AppError, type ErrorCode } from "./AppError.js";
import { mapPrismaError, mapMongooseError, mapRedisError } from "./mappers.js";

// 400 Bad Request

export class ValidationError extends AppError {
    constructor(details?: unknown, message = "Dane wejściowe są nieprawidłowe") {
        super({
            message,
            statusCode: 400,
            code: "VALIDATION_ERROR",
            details,
        });
    }
}

export class InvalidParamsError extends AppError {
    constructor(details?: unknown, message = "Nieprawidłowe parametry żądania") {
        super({
            message,
            statusCode: 400,
            code: "INVALID_PARAMS",
            details,
        });
    }
}

// 401 Unauthorized

export class UnauthorizedError extends AppError {
    constructor(message = "Wymagane uwierzytelnienie") {
        super({ message, statusCode: 401, code: "UNAUTHORIZED" });
    }
}

export class TokenExpiredError extends AppError {
    constructor(message = "Token wygasł") {
        super({ message, statusCode: 401, code: "TOKEN_EXPIRED" });
    }
}

export class TokenInvalidError extends AppError {
    constructor(message = "Token jest nieprawidłowy") {
        super({ message, statusCode: 401, code: "TOKEN_INVALID" });
    }
}

export class RefreshTokenInvalidError extends AppError {
    constructor(message = "Refresh token jest nieprawidłowy lub wygasł") {
        super({ message, statusCode: 401, code: "REFRESH_TOKEN_INVALID" });
    }
}

// 403 Forbidden

export class ForbiddenError extends AppError {
    constructor(message = "Brak uprawnień do wykonania tej operacji") {
        super({ message, statusCode: 403, code: "FORBIDDEN" });
    }
}

// 404 Not Found

export class NotFoundError extends AppError {
    constructor(resource = "Zasób", id?: string | number) {
        super({
            message: id
                ? `${resource} o ID ${id} nie istnieje`
                : `${resource} nie został znaleziony`,
            statusCode: 404,
            code: "NOT_FOUND",
            details: id ? { id } : undefined,
        });
    }
}

// 409 Conflict

export class AlreadyExistsError extends AppError {
    constructor(resource = "Zasób", field?: string, value?: unknown) {
        super({
            message: field
                ? `${resource} z ${field} "${value}" już istnieje`
                : `${resource} już istnieje`,
            statusCode: 409,
            code: "ALREADY_EXISTS",
            details: field ? { field, value } : undefined,
        });
    }
}

export class ConflictError extends AppError {
    constructor(message = "Konflikt stanu zasobu", details?: unknown) {
        super({ message, statusCode: 409, code: "CONFLICT", details });
    }
}

// Błędy domenowe CMMS

export class AssetNotAvailableError extends AppError {
    constructor(assetId: number) {
        super({
            message: `Urządzenie o ID ${assetId} jest niedostępne (awaria lub wycofane)`,
            statusCode: 409,
            code: "ASSET_NOT_AVAILABLE",
            details: { assetId },
        });
    }
}

export class WorkOrderAlreadyClosedError extends AppError {
    constructor(workOrderId: number) {
        super({
            message: `Zlecenie robocze o ID ${workOrderId} jest już zamknięte`,
            statusCode: 409,
            code: "WORK_ORDER_ALREADY_CLOSED",
            details: { workOrderId },
        });
    }
}

export class InsufficientStockError extends AppError {
    constructor(partId: number, requested: number, available: number) {
        super({
            message: `Niewystarczający stan magazynowy dla części ID ${partId}`,
            statusCode: 409,
            code: "INSUFFICIENT_STOCK",
            details: { partId, requested, available },
        });
    }
}

// 500 Server Errors

export class InternalServerError extends AppError {
    constructor(cause?: unknown) {
        super({
            message: "Wewnętrzny błąd serwera",
            statusCode: 500,
            code: "INTERNAL_SERVER_ERROR",
            cause,
        });
    }
}

export class DatabaseError extends AppError {
    constructor(cause?: unknown) {
        super({
            message: "Błąd bazy danych",
            statusCode: 500,
            code: "DATABASE_ERROR",
            cause,
        });
    }
}

export class ExternalServiceError extends AppError {
    constructor(service: string, cause?: unknown) {
        super({
            message: `Błąd komunikacji z serwisem zewnętrznym: ${service}`,
            statusCode: 500,
            code: "EXTERNAL_SERVICE_ERROR",
            details: { service },
            cause,
        });
    }
}

// toAppError — smart factory

function isPrismaError(err: unknown): boolean {
    return (
        err instanceof Prisma.PrismaClientKnownRequestError ||
        err instanceof Prisma.PrismaClientUnknownRequestError ||
        err instanceof Prisma.PrismaClientValidationError ||
        err instanceof Prisma.PrismaClientInitializationError ||
        err instanceof Prisma.PrismaClientRustPanicError
    );
}

function isMongooseError(err: unknown): boolean {
    if (err instanceof MongooseError) return true;
    if (err instanceof Error) {
        return (
            err.name === "MongoServerError" ||
            err.name === "MongoNetworkError" ||
            err.name === "MongoNetworkTimeoutError" ||
            err.name === "MongoServerSelectionError" ||
            err.name === "MongoTopologyClosedError"
        );
    }
    return false;
}

function isRedisError(err: unknown): boolean {
    if (!(err instanceof Error)) return false;
    return (
        err.name === "ReplyError" ||
        err.name === "MaxRetriesPerRequestError" ||
        err.name === "TimeoutError" ||
        err.message.toLowerCase().includes("redis") ||
        err.constructor?.name?.toLowerCase().includes("redis")
    );
}

export function toAppError(err: unknown): AppError {
    if (err instanceof AppError) return err;

    if (isPrismaError(err)) return mapPrismaError(err);
    if (isMongooseError(err)) return mapMongooseError(err);
    if (isRedisError(err)) return mapRedisError(err);

    if (err instanceof Error) return new InternalServerError(err);

    return new InternalServerError(String(err));
}
