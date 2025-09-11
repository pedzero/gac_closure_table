import { Router } from "express";
import usersRoutes from "./users.routes";
import groupsRoutes from "./groups.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/groups", groupsRoutes);

export default router;
