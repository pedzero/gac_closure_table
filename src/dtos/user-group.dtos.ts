import { z } from "zod";

export const UserGroupSchema = z.object({
    userId: z.uuid(),
    groupId: z.uuid(),
});

export type UserGroupDto = z.infer<typeof UserGroupSchema>;
