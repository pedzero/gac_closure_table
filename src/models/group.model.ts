export interface Group {
    id: string;
    name: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type GroupWithType = Group & { type: "GROUP" };

export function withGroupType(user: Group): GroupWithType {
    return { ...user, type: "GROUP" };
}
