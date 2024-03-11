import express from "express";
import TaskService from "../service.js";
import task from "../models/task.js";

const router = express.Router();

const getAllTasksAction = (_taskService) => async (_, res, next) => {
  try {
    const tasks = await _taskService.getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = router.get(
  "/",
  getAllTasksAction(new TaskService(task))
);
