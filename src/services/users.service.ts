import { CreateUserDto } from "../dtos/user.dtos";
import { UserGroupDto } from "../dtos/user-group.dtos";
import * as UsersRepository from "../repositories/users.repository";
import * as GroupsRepository from "../repositories/groups.repository";
import * as userGroupRepository from "../repositories/user-group.repository";
import { ConflictError, NotFoundError } from "../utils/errors";

export async function createUser(data: CreateUserDto) {
    const user = await UsersRepository.createUser(data);
    return user;
}

export async function addUserToGroup(data: UserGroupDto): Promise<void> {
    // check if user exists
    const user = await UsersRepository.findUnique({ userId: data.userId });
    if (!user) {
        throw new NotFoundError(`User ${data.userId} not found`);
    }

    // check if group exists
    const group = await GroupsRepository.findUnique({ groupId: data.groupId });
    if (!group) {
        throw new NotFoundError(`Group ${data.groupId} not found`);
    }

    // avoid duplicate entries
    const exists = await userGroupRepository.findUnique(data);
    if (exists) {
        throw new ConflictError(`User ${data.userId} is already in group ${data.groupId}`);
    }

    await userGroupRepository.addUserToGroup(data);
}
