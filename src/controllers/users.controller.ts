import { Request, Response, NextFunction } from "express";
import * as UsersService from "../services/users.service";
import { CreateUserDto, createUserSchema, FindUserDto, findUserSchema } from "../dtos/user.dtos";
import { UserGroupDto, UserGroupSchema } from "../dtos/user-group.dtos";
import { User } from "../models/user.model";
import { UserOrganization } from "../models/organization.model";

export async function createUser(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const dto: CreateUserDto = createUserSchema.parse(request.body);
        const user: User = await UsersService.createUser(dto);
        response.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export async function assignUserToGroup(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const { id: userId } = request.params;
        const data: UserGroupDto = {
            ...request.body,
            userId,
        };
        const dto: UserGroupDto = UserGroupSchema.parse(data);
        await UsersService.addUserToGroup(dto);
        response.status(204).send();
    } catch (error) {
        next(error);
    }
}

export async function getUserOrganizations(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const dto: FindUserDto = findUserSchema.parse(request.params);
        const organizations: UserOrganization[] = await UsersService.getUserOrganizations(dto);
        response.status(200).json(organizations);
    } catch (error) {
        next(error);
    }
}
