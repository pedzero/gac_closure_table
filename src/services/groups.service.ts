import { CreateGroupDto } from "../dtos/group.dtos";
import * as GroupsRepository from "../repositories/groups.repository";

export async function createGroup(data: CreateGroupDto) {
    const group = await GroupsRepository.createGroup(data);
    return group;
}
