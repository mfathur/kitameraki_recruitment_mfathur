import express from "express";
import { getOptionalFormFormat } from "./get.optionalFormFormat.js";
import { putOptionalFormFormat } from "./put.optionalFormFormat.js";

const router = express.Router();

router.use(getOptionalFormFormat, putOptionalFormFormat);

export default router;
