export class AppError extends Error {
    public readonly status: number;
    public readonly code?: string;

    constructor(message: string, status = 500, code?: string) {
        super(message);
        this.status = status;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflict", code?: string) {
        super(message, 409, code);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
