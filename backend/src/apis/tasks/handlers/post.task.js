import express from "express";
import TaskService from "../service.js";
import validateRequestBodySchema from "../../../middlewares/validateRequestBodySchema.js";
import taskDao from "../models/taskDao.js";

const router = express.Router();

const postTaskAction = (_taskService) => async (req, res, next) => {
  try {
    const taskId = await _taskService.addTask(req.body);

    res.status(201).json({
      success: true,
      data: {
        id: taskId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const postTask = router.post(
  "/",
  validateRequestBodySchema("postTaskRequest"),
  postTaskAction(new TaskService(taskDao))
);
