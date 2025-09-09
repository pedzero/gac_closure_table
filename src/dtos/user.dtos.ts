import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
})

export type CreateUserDto = z.infer<typeof createUserSchema>;
