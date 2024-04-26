import express from "express";
import FormService from "../service.js";
import formDao from "../models/formDao.js";

const router = express.Router();

const patchOptionalFormFormatAction =
  (_formService) => async (req, res, next) => {
    try {
      const newOptionalFormFormat = req.body["format"];

      await _formService.editOptionalFormFormat(newOptionalFormFormat);

      res.status(200).json({
        success: true,
        message: "optional form successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

export const patchOptionalFormFormat = router.patch(
  "/optional",
  patchOptionalFormFormatAction(new FormService(formDao))
);
