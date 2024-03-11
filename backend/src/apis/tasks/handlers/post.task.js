import express from "express";
import TaskService from "../service.js";
import task from "../models/task.js";
import checkTaskBodyRequest from "../middlewares/validationRules.js";
import checkRequestError from "../../../utils/checkRequestError.js";

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
  checkTaskBodyRequest(),
  checkRequestError,
  postTaskAction(new TaskService(task))
);
