export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserWithType = User & { type: "USER" };

export function withUserType(user: User): UserWithType {
    return { ...user, type: "USER" };
}
