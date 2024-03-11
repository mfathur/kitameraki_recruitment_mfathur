import express from "express";
import TaskService from "../service.js";
import task from "../models/task.js";

const router = express.Router();

const deleteTaskAction = (_taskService) => async (req, res, next) => {
  try {
    const { id } = req.params;
    await _taskService.deleteTaskBy(id);

    res.status(200).json({
      success: true,
      message: "task successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = router.delete(
  "/:id",
  deleteTaskAction(new TaskService(task))
);
