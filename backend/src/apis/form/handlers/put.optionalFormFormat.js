import express from "express";
import FormService from "../service.js";
import form from "../models/form.js";

const router = express.Router();

const putOptionalFormFormatAction =
  (_formService) => async (req, res, next) => {
    try {
      const newOptionalFormFormat = req.body;

      await _formService.editOptionalFormFormat(newOptionalFormFormat);

      res.status(200).json({
        success: true,
        message: "optional form successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

export const putOptionalFormFormat = router.put(
  "/optional",
  putOptionalFormFormatAction(new FormService(form))
);
