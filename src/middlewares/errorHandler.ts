import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { ZodError } from "zod";

export function errorHandler(error: unknown, request: Request, response: Response, _next: NextFunction) {
    if (error instanceof AppError) {
        return response.status(error.status).json({
            status: "error",
            message: error.message,
            code: error.code ?? undefined,
        });
    }

    if (error instanceof ZodError) {
        return response.status(400).json({
            status: "error",
            issues: error.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
        });
    }

    console.error("Unhandled error:", error);
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
}
