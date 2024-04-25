import express from "express";
import TaskService from "../service.js";
import taskDao from "../models/taskDao.js";
import validateRequestBodySchema from "../../../middlewares/validateRequestBodySchema.js";

const router = express.Router();

const putTaskAction = (_taskService) => async (req, res, next) => {
  try {
    const { id } = req.params;

    await _taskService.editTask(id, req.body);

    res.status(200).json({
      success: true,
      message: "task successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export const putTask = router.put(
  "/:id",
  validateRequestBodySchema("putTaskRequest"),
  putTaskAction(new TaskService(taskDao))
);
