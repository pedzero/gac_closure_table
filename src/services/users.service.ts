import { CreateUserDto } from "../dtos/user.dtos";
import * as UsersRepository from "../repositories/users.repository";

export async function createUser(data: CreateUserDto) {
    const user = await UsersRepository.createUser(data);
    return user;
}
