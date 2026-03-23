import { Prisma } from "../generated/prisma/client.js";
import { MongooseError } from "mongoose";
import { AppError } from "./AppError.js";
import {
    DatabaseError,
    AlreadyExistsError,
    NotFoundError,
    ValidationError,
    InternalServerError,
    ExternalServiceError,
} from "./HttpErrors.js";

// Prisma

/**
 * Kody błędów Prismy:
 * P2000 – wartość za długa dla kolumny
 * P2001 – rekord nie istnieje (WHERE)
 * P2002 – unique constraint
 * P2003 – foreign key constraint
 * P2004 – constraint na poziomie bazy
 * P2005 – nieprawidłowa wartość pola
 * P2006 – nieprawidłowy typ wartości
 * P2011 – null constraint
 * P2012 – brakujące wymagane pole
 * P2025 – rekord nie znaleziony (operacje update/delete)
 * P1001 – brak połączenia z bazą
 * P1002 – timeout połączenia
 * P1008 – timeout operacji
 * P1017 – serwer rozłączył połączenie
 */

export function mapPrismaError(err: unknown): AppError {
    // Błąd zapytania (np. unique constraint, not found, validation)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002": {
                const fields = (err.meta?.target as string[])?.join(", ") ?? "pole";
                return new AlreadyExistsError("Zasób", fields);
            }

            case "P2001":
            case "P2025": {
                const model = (err.meta?.modelName as string) ?? "Zasób";
                return new NotFoundError(model);
            }

            case "P2003": {
                const field = (err.meta?.field_name as string) ?? "pole";
                return new ValidationError(
                    { field },
                    `Naruszenie klucza obcego: powiązany zasób dla pola "${field}" nie istnieje`
                );
            }

            case "P2000":
            case "P2005":
            case "P2006":
            case "P2011":
            case "P2012": {
                return new ValidationError(
                    { prismaCode: err.code, meta: err.meta },
                    "Nieprawidłowe dane — błąd walidacji bazy danych"
                );
            }

            case "P2004": {
                return new DatabaseError(err);
            }

            default:
                return new DatabaseError(err);
        }
    }

    // Błąd walidacji po stronie klienta Prismy (np. zły typ w kodzie)
    if (err instanceof Prisma.PrismaClientValidationError) {
        return new ValidationError(
            { raw: err.message },
            "Nieprawidłowe dane przekazane do zapytania bazodanowego"
        );
    }

    // Błędy połączenia
    if (err instanceof Prisma.PrismaClientInitializationError) {
        return new DatabaseError(err);
    }

    if (err instanceof Prisma.PrismaClientRustPanicError) {
        return new DatabaseError(err);
    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        return new DatabaseError(err);
    }

    return new DatabaseError(err);
}

// Mongoose

export function mapMongooseError(err: unknown): AppError {
    if (!(err instanceof Error)) {
        return new ExternalServiceError("MongoDB", err);
    }

    const name = err.name;

    // Validation error (np. required, enum, min/max)
    if (name === "ValidationError") {
        // MongooseError.ValidationError ma pole `errors`
        const details =
            "errors" in err
                ? Object.fromEntries(
                    Object.entries(err.errors as Record<string, { message: string }>).map(
                        ([key, val]) => [key, val.message]
                    )
                )
                : undefined;

        return new ValidationError(details, "Błąd walidacji dokumentu MongoDB");
    }

    // Duplicate key (kod 11000 / 11001)
    if (name === "MongoServerError" && "code" in err) {
        const code = (err as { code: number }).code;
        if (code === 11000 || code === 11001) {
            const keyValue = "keyValue" in err
                ? (err as { keyValue: Record<string, unknown> }).keyValue
                : undefined;
            const field = keyValue ? Object.keys(keyValue)[0] : undefined;
            const value = keyValue && field ? keyValue[field] : undefined;
            return new AlreadyExistsError("Dokument", field, value);
        }
    }

    // Cast error (np. nieprawidłowy ObjectId)
    if (name === "CastError") {
        const path = "path" in err ? (err as { path: string }).path : "pole";
        const value = "value" in err ? (err as { value: unknown }).value : undefined;
        return new ValidationError(
            { path, value },
            `Nieprawidłowa wartość dla pola "${path}"`
        );
    }

    // Timeout / połączenie
    if (
        name === "MongoNetworkError" ||
        name === "MongoNetworkTimeoutError" ||
        name === "MongoServerSelectionError"
    ) {
        return new ExternalServiceError("MongoDB", err);
    }

    // Disconnect / topology
    if (name === "MongoTopologyClosedError") {
        return new ExternalServiceError("MongoDB", err);
    }

    // Fallback
    if (err instanceof MongooseError) {
        return new ExternalServiceError("MongoDB", err);
    }

    return new ExternalServiceError("MongoDB", err);
}

// Redis

export function mapRedisError(err: unknown): AppError {
    if (!(err instanceof Error)) {
        return new ExternalServiceError("Redis", err);
    }

    const name = err.name;
    const message = err.message.toLowerCase();

    // Brak połączenia
    if (
        name === "ReplyError" &&
        (message.includes("connection") || message.includes("connect"))
    ) {
        return new ExternalServiceError("Redis", err);
    }

    if (
        name === "MaxRetriesPerRequestError" ||
        message.includes("max retries") ||
        message.includes("stream isn't writeable")
    ) {
        return new ExternalServiceError("Redis", err);
    }

    // Timeout
    if (message.includes("timeout") || name === "TimeoutError") {
        return new ExternalServiceError("Redis", err);
    }

    // Błąd autoryzacji Redis (requirepass)
    if (message.includes("noauth") || message.includes("wrongpass")) {
        return new ExternalServiceError("Redis — błąd autoryzacji", err);
    }

    // Błąd odpowiedzi (np. WRONGTYPE — operacja na złym typie klucza)
    if (name === "ReplyError") {
        return new ExternalServiceError("Redis — błąd odpowiedzi", err);
    }

    return new ExternalServiceError("Redis", err);
}
