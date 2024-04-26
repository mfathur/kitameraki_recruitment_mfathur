import express from "express";
import { getPaginatedTasks } from "./get.paginatedTasks.js";
import { getTask } from "./get.task.js";
import { deleteTask } from "./delete.task.js";
import { postTask } from "./post.task.js";
import { putTask } from "./put.task.js";
import { patchTask } from "./patch.task.js";

const router = express.Router();

router.use(
  getPaginatedTasks,
  getTask,
  deleteTask,
  postTask,
  putTask,
  patchTask
);

export default router;
