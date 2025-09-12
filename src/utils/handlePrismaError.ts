import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError, ConflictError, BadRequestError } from "./errors";

export function handlePrismaError(error: unknown): AppError | undefined {
    if (!(error instanceof PrismaClientKnownRequestError)) return undefined;

    switch (error.code) {
        // unique constraint violation
        case "P2002": {
            const targets = error.meta?.target;
            const fields = Array.isArray(targets) ? targets.join(", ") : targets ?? "field";
            return new ConflictError(`Duplicate value for field(s): ${fields}`, fields.toString());
        }

        // foreign key violation
        case "P2003": {
            const fields = Array.isArray(error.meta?.target) ? error.meta?.target.join(", ") : error.meta?.target ?? "field";
            return new BadRequestError(`Foreign key constraint failed on field(s): ${fields}`);
        }

        // not found 
        case "P2025": {
            const fields = Array.isArray(error.meta?.target) ? error.meta?.target.join(", ") : error.meta?.target ?? "record";
            return new BadRequestError(`Record not found for operation on field(s): ${fields}`);
        }

        default:
            return undefined;
    }
}
