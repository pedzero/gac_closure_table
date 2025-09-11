import { prisma } from "../infra/db/prisma";
import { CreateUserDto, FindUserDto } from "../dtos/user.dtos";
import { User } from "../models/user.model";

export async function findUnique(data: FindUserDto): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { id: data.userId },
    });

    return user;
}

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
