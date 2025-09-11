import { Router } from "express";
import * as GroupsController from "../controllers/groups.controller";

const router = Router();

router.post("/", GroupsController.createGroup);

export default router;
