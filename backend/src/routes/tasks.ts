import { Router } from "express";
import auth from "../middleware/auth";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTask
} from "../controllers/taskController";

const router = Router();
router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

export default router;
