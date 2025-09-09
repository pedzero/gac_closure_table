import { prisma } from "../infra/db/prisma";
import { CreateUserDto } from "../dtos/user.dtos";
import { User } from "../models/user.model";

export async function createUser(data: CreateUserDto): Promise<User> {
    try {
        const created = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
            },
        });

        const user: User = {
            id: created.id,
            name: created.name,
            email: created.email,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };
        
        return user;
    } catch (error) {
        throw error;
    }
}
