export class AppError extends Error {
    public readonly status: number;
    public readonly code?: string;
    public readonly issues?: { path: string; message: string }[];

    constructor(message: string, status = 500, code?: string, issues?: { path: string; message: string }[]) {
        super(message);
        this.status = status;
        this.code = code;
        this.issues = issues;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request", issues?: { path: string; message: string }[]) {
        super(message, 400, undefined, issues);
    }
}

export class UnprocessableEntityError extends AppError {
    constructor(
        message = "Unprocessable Entity",
        issues?: { path: string; message: string }[]
    ) {
        super(message, 422, undefined, issues);
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
