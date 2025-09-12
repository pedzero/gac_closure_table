import { Group } from "@prisma/client";
import { CreateGroupDto, FindGroupDto } from "../dtos/group.dtos";
import * as GroupsRepository from "../repositories/groups.repository";
import { NotFoundError } from "../utils/errors";

export async function createGroup(data: CreateGroupDto) {
    const group = await GroupsRepository.createGroup(data);
    return group;
}

export async function getGroupAncestors(data: FindGroupDto): Promise<Node[]> {
    // check if group exists
    const group: Group | null = await GroupsRepository.findUnique(data);
    if (!group) {
        throw new NotFoundError(`Group ${data.groupId} not found`);
    }

    return GroupsRepository.getGroupAncestors(data);
}

export async function getGroupDescendants(data: FindGroupDto): Promise<Node[]> {
    // check if group exists
    const group: Group | null = await GroupsRepository.findUnique(data);
    if (!group) {
        throw new NotFoundError(`Group ${data.groupId} not found`);
    }

    return GroupsRepository.getGroupDescendants(data);
}
