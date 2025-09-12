import { Request, Response, NextFunction } from "express";
import * as GroupsService from "../services/groups.service";
import { CreateGroupDto, createGroupSchema, FindGroupDto, findGroupSchema } from "../dtos/group.dtos";
import { GroupWithType } from "../models/group.model";

export async function createGroup(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const dto: CreateGroupDto = createGroupSchema.parse(request.body);
        const group: GroupWithType = await GroupsService.createGroup(dto);
        response.status(201).json(group);
    } catch (error) {
        next(error);
    }
}

export async function getGroupAncestors(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const dto: FindGroupDto = findGroupSchema.parse({ groupId: request.params.id });
        const ancestors: Node[] = await GroupsService.getGroupAncestors(dto);
        response.status(200).json(ancestors);
    } catch (error) {
        next(error);
    }
}

export async function getGroupDescendants(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const dto: FindGroupDto = findGroupSchema.parse({ groupId: request.params.id });
        const descendants: Node[] = await GroupsService.getGroupDescendants(dto);
        response.status(200).json(descendants);
    } catch (error) {
        next(error);
    }
}
