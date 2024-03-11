import express from "express";
import { getAllTasks } from "./get.allTasks.js";
import { getTask } from "./get.task.js";

const router = express.Router();

router.use(getAllTasks, getTask);

export default router;
