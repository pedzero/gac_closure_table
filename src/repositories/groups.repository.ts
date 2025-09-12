import { prisma } from "../infra/db/prisma";
import { CreateGroupDto, FindGroupDto } from "../dtos/group.dtos";
import { Group } from "../models/group.model";
import { NotFoundError } from "../utils/errors";
import { GroupClosure } from "../models/group-closure.model";

export async function findUnique(data: FindGroupDto): Promise<Group | null> {
    const group: Group | null = await prisma.group.findUnique({
        where: { id: data.groupId },
    });

    return group;
}

export async function createGroup(data: CreateGroupDto): Promise<Group> {
    return await prisma.$transaction(async (tx) => {
        // parantId validation
        if (data.parentId) {
            const parentExists: Group | null = await tx.group.findUnique({
                where: { id: data.parentId },
            });

            if (!parentExists) {
                throw new NotFoundError(`Parent group ${data.parentId} does not exist`);
            }
        }

        // create group
        const created: Group = await tx.group.create({
            data: {
                name: data.name,
                parentId: data.parentId || null,
            },
        });

        // create reflexive closure entry
        await tx.groupClosure.create({
            data: {
                ancestorId: created.id,
                descendantId: created.id,
                depth: 0,
            },
        });

        // if has parent, create closure entries
        if (data.parentId) {
            // get all ancestors of the parent
            const parentAncestors: GroupClosure[] = await tx.groupClosure.findMany({
                where: { descendantId: data.parentId },
            });

            // create closure entries for the new group
            const closureInserts: GroupClosure[] = parentAncestors.map((ancestor: GroupClosure) => ({
                ancestorId: ancestor.ancestorId,
                descendantId: created.id,
                depth: ancestor.depth + 1,
            }));

            if (closureInserts.length > 0) {
                await tx.groupClosure.createMany({ data: closureInserts });
            }
        }

        const group: Group = {
            id: created.id,
            name: created.name,
            parentId: created.parentId,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };

        return group;
    });
}

export async function getGroupAncestors(data: FindGroupDto): Promise<Node[]> {
    return prisma.$queryRaw<Node[]>`
    SELECT g.id, g.name, gc.depth
    FROM group_closure gc
    JOIN groups g ON g.id = gc."ancestorId"
    WHERE gc."descendantId" = ${data.groupId}::uuid
      AND gc.depth >= 1
    ORDER BY gc.depth ASC;
  `;
}

export async function getGroupDescendants(data: FindGroupDto): Promise<Node[]> {
    return prisma.$queryRaw<Node[]>`
    SELECT g.id, g.name, gc.depth
    FROM group_closure gc
    JOIN groups g ON g.id = gc."descendantId"
    WHERE gc."ancestorId" = ${data.groupId}::uuid
      AND gc.depth >= 1
    ORDER BY gc.depth ASC;
  `;
}
