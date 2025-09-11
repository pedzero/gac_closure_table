import { z } from "zod";

export const findGroupSchema = z.object({
    groupId: z.uuid(),
});

export const createGroupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    parentId: z.uuid().optional().nullable(),
})

export type FindGroupDto = z.infer<typeof findGroupSchema>;
export type CreateGroupDto = z.infer<typeof createGroupSchema>;
