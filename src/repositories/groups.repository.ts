import { prisma } from "../infra/db/prisma";
import { CreateGroupDto } from "../dtos/group.dtos";
import { Group } from "../models/group.model";
import { NotFoundError } from "../utils/errors";

export async function createGroup(data: CreateGroupDto): Promise<Group> {
    return await prisma.$transaction(async (tx) => {
        // parantId validation
        if (data.parentId) {
            const parentExists = await tx.group.findUnique({
                where: { id: data.parentId },
            });

            if (!parentExists) {
                throw new NotFoundError(`Parent group with id=${data.parentId} does not exist`);
            }
        }

        // create group
        const created = await tx.group.create({
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
            const parentAncestors = await tx.groupClosure.findMany({
                where: { descendantId: data.parentId },
            });

            // create closure entries for the new group
            const closureInserts = parentAncestors.map((ancestor) => ({
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
