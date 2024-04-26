import express from "express";
import FormService from "../service.js";
import formDao from "../models/formDao.js";

const router = express.Router();

const getOptionalFormFormatAction = (_formService) => async (_, res, next) => {
  try {
    const optionalFormFormat = await _formService.getOptionalFormFormat();

    res.status(200).json({
      success: true,
      data: optionalFormFormat,
    });
  } catch (error) {
    next(error);
  }
};

export const getOptionalFormFormat = router.get(
  "/optional",
  getOptionalFormFormatAction(new FormService(formDao))
);
