import { Router } from "express";
import * as UsersController from "../controllers/users.controller";

const router = Router();

router.post("/", UsersController.createUser);
//router.post("/:id/groups", UsersController.assignUserToGroup);
//router.get("/:id/organizations", UsersController.getUserOrganizations);

export default router;
