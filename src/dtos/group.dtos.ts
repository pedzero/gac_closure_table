import { z } from "zod";

export const createGroupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    parentId: z.uuid().optional().nullable(),
})

export type CreateGroupDto = z.infer<typeof createGroupSchema>;
