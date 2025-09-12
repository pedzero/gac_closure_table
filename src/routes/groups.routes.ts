import { Router } from "express";
import * as GroupsController from "../controllers/groups.controller";

const router: Router = Router();

router.post("/", GroupsController.createGroup);
router.get("/:id/ancestors", GroupsController.getGroupAncestors);
router.get("/:id/descendants", GroupsController.getGroupDescendants);

export default router;
