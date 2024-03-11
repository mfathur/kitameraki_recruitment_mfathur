import express from "express";
import { getAllTasks } from "./get.allTasks.js";

const router = express.Router();

router.use(getAllTasks);

export default router;
