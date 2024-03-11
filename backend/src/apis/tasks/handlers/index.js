import express from "express";
import { getAllTasks } from "./get.allTasks.js";
import { getTask } from "./get.task.js";
import { deleteTask } from "./delete.task.js";

const router = express.Router();

router.use(getAllTasks, getTask, deleteTask);

export default router;
