import { prisma } from "../infra/db/prisma";
import { UserGroup } from "../models/user-group.model";
import { UserGroupDto } from "../dtos/user-group.dtos";

export async function findUnique(data: UserGroupDto): Promise<UserGroup | null> {
    const userGroup: UserGroup | null = await prisma.userGroup.findUnique({
        where: {
            userId_groupId: {
                userId: data.userId,
                groupId: data.groupId,
            }
        },
    });

    const userGroupResult: UserGroup | null = userGroup ? {
        userId: userGroup.userId,
        groupId: userGroup.groupId,
    } : null;

    return userGroupResult;
}

export async function addUserToGroup(data: UserGroupDto): Promise<UserGroup> {
    const created: UserGroup | null = await prisma.userGroup.create({
        data: {
            userId: data.userId,
            groupId: data.groupId,
        },
    });

    const userGroup: UserGroup = {
        userId: created.userId,
        groupId: created.groupId,
    };

    return userGroup;
}
