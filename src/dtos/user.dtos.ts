import { z } from 'zod';

export const findUserSchema = z.object({
    userId: z.uuid(),
});

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
})

export type FindUserDto = z.infer<typeof findUserSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
