import express from "express";
import TaskService from "../service.js";
import task from "../models/task.js";
import checkTaskBodyRequest from "../middlewares/validationRules.js";
import checkRequestError from "../../../middlewares/checkRequestError.js";

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
    next(err);
  }
};

export const putTask = router.put(
  "/:id",
  checkTaskBodyRequest(),
  checkRequestError,
  putTaskAction(new TaskService(task))
);
