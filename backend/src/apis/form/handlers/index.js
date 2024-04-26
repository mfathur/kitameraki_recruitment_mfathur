import express from "express";
import { getOptionalFormFormat } from "./get.optionalFormFormat.js";
import { patchOptionalFormFormat } from "./patch.optionalFormFormat.js";

const router = express.Router();

router.use(getOptionalFormFormat, patchOptionalFormFormat);

export default router;
