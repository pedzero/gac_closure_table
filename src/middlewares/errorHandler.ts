import { Request, Response, NextFunction } from "express";
import { AppError, UnprocessableEntityError } from "../utils/errors";
import { handlePrismaError } from "../utils/handlePrismaError";
import { ZodError } from "zod";

export function errorHandler(error: unknown, request: Request, response: Response, _next: NextFunction): Response {
    let formattedError: AppError;

    if (error instanceof AppError) {
        formattedError = error;
    }

    else if (error instanceof ZodError) {
        formattedError = new UnprocessableEntityError("Validation failed", error.issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message,
        })));
    }

    else {
        const prismaError = handlePrismaError(error);
        if (prismaError) {
            formattedError = prismaError;
        } else {
            console.error("Unhandled error:", error);
            formattedError = new AppError("Internal server error", 500);
        }
    }

    const responseBody: Record<string, unknown> = {
        status: "error",
        message: formattedError.message,
    };
    if (formattedError.code) responseBody.code = formattedError.code;
    if (formattedError.issues) responseBody.issues = formattedError.issues;

    return response.status(formattedError.status).json(responseBody);
}
