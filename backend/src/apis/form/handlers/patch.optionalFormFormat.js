import express from "express";
import FormService from "../service.js";
import formDao from "../models/formDao.js";
import validateRequestBodySchema from "../../../middlewares/validateRequestBodySchema.js";

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
  validateRequestBodySchema("patchOptionalFormRequest"),
  patchOptionalFormFormatAction(new FormService(formDao))
);
