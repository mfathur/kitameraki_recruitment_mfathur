import express from "express";
import TaskService from "../service.js";
import task from "../models/task.js";

const router = express.Router();

const getTaskAction = (_taskService) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await _taskService.getTaskBy(id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = router.get("/:id", getTaskAction(new TaskService(task)));
