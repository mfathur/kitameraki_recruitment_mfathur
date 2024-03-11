import express from "express";
import { getAllTasks } from "./get.allTasks.js";
import { getTask } from "./get.task.js";
import { deleteTask } from "./delete.task.js";
import { postTask } from "./post.task.js";
import { putTask } from "./put.task.js";

const router = express.Router();

router.use(getAllTasks, getTask, deleteTask, postTask, putTask);

export default router;
