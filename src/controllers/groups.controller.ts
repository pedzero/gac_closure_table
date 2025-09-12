import { Request, Response, NextFunction } from "express";
import * as GroupsService from "../services/groups.service";
import { createGroupSchema } from "../dtos/group.dtos";

export async function createGroup(request: Request, response: Response, next: NextFunction) {
    try {
        const dto = createGroupSchema.parse(request.body);
        const group = await GroupsService.createGroup(dto);
        response.status(201).json(group);
    } catch (error) {
        next(error);
    }
}

export async function getGroupAncestors(request: Request, response: Response, next: NextFunction) {
    try {
        const { id: groupId } = request.params;
        const ancestors = await GroupsService.getGroupAncestors({ groupId });
        response.status(200).json(ancestors);
    } catch (error) {
        next(error);
    }
}
