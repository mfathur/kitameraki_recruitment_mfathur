import express from "express";
import TaskService from "../service.js";
import task from "../models/task.js";
import validateRequestBodySchema from "../../../middlewares/validateRequestBodySchema.js";

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
  validateRequestBodySchema("tasks/schemas/postTaskSchema.json"),
  postTaskAction(new TaskService(task))
);
