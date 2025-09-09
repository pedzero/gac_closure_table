import { Request, Response, NextFunction } from "express";
import * as UsersService from "../services/users.service";
import { createUserSchema } from "../dtos/user.dtos";

export async function createUser(request: Request, response: Response, next: NextFunction) {
    try {
        const dto = createUserSchema.parse(request.body);
        const user = await UsersService.createUser(dto);
        response.status(201).json(user);    
    } catch (error) {
        next(error);
    }
}
