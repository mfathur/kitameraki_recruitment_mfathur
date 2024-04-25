import express from "express";
import TaskService from "../service.js";
import taskDao from "../models/taskDao.js";

const router = express.Router();

const getPaginatedTasksAction = (_taskService) => async (req, res, next) => {
  try {
    const { page = 1, per_page: perPage = 5 } = req.query;
    const { tasks, metadata } = await _taskService.getPaginatedTasks(
      page,
      perPage
    );

    res.status(200).json({
      success: true,
      data: tasks,
      metadata,
    });
  } catch (error) {
    next(error);
  }
};

export const getPaginatedTasks = router.get(
  "/",
  getPaginatedTasksAction(new TaskService(taskDao))
);
