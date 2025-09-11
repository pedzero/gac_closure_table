export interface Group {
    id: string;
    name: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
