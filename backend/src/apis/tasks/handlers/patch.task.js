import express from "express";
import TaskService from "../service.js";
import taskDao from "../models/taskDao.js";
import validateRequestBodySchema from "../../../middlewares/validateRequestBodySchema.js";

const router = express.Router();

const patchTaskAction = (_taskService) => async (req, res, next) => {
  try {
    const { id } = req.params;

    await _taskService.editTaskProperties(id, req.body);

    res.status(200).json({
      success: true,
      message: "task properties successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export const patchTask = router.patch(
  "/:id",
  validateRequestBodySchema("patchTaskRequest"),
  patchTaskAction(new TaskService(taskDao))
);
