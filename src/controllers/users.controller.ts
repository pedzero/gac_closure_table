import { Request, Response, NextFunction } from "express";
import * as UsersService from "../services/users.service";
import { createUserSchema } from "../dtos/user.dtos";
import { UserGroupSchema } from "../dtos/user-group.dtos";

export async function createUser(request: Request, response: Response, next: NextFunction) {
    try {
        const dto = createUserSchema.parse(request.body);
        const user = await UsersService.createUser(dto);
        response.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export async function assignUserToGroup(request: Request, response: Response, next: NextFunction) {
    try {
        const { id: userId } = request.params;
        const data = {
            ...request.body,
            userId,
        };
        const dto = UserGroupSchema.parse(data);
        await UsersService.addUserToGroup(dto);
        response.status(204).send();
    } catch (error) {
        next(error);
    }
}

export async function getUserOrganizations(request: Request, response: Response, next: NextFunction) {
    try {
        const { id: userId } = request.params;
        const organizations = await UsersService.getUserOrganizations({ userId });
        response.status(200).json(organizations);
    } catch (error) {
        next(error);
    }
}
