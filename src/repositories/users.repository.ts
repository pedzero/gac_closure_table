import { prisma } from "../infra/db/prisma";
import { CreateUserDto, FindUserDto } from "../dtos/user.dtos";
import { User } from "../models/user.model";
import { UserOrganization } from "../models/organization.model";

export async function findUnique(data: FindUserDto): Promise<User | null> {
    const user: User | null = await prisma.user.findUnique({
        where: { id: data.userId },
    });

    return user;
}

export async function createUser(data: CreateUserDto): Promise<User> {
    try {
        const created: User = await prisma.user.create({
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

export async function getUserOrganizations(data: FindUserDto): Promise<UserOrganization[]> {
    const result = await prisma.$queryRaw<UserOrganization[]>`
    SELECT g.id, g.name, MIN(ugc.depth) + 1 AS depth
    FROM user_groups ug
    JOIN group_closure ugc ON ug."groupId" = ugc."descendantId"
    JOIN groups g ON g.id = ugc."ancestorId"
    WHERE ug."userId" = ${data.userId}::uuid
    
    GROUP BY g.id, g.name
    ORDER BY depth ASC;
  `;
    return result;
}
