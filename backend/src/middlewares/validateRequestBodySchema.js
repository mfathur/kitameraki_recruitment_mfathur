import { ajv, loadSchemaFileContent } from "../utils/ajv.js";

/**
 * Middleware to validate request body JSON schema.
 *
 * @param {string} filePath JSON schema file path
 */
const validateRequestBodySchema = (filePath) => async (req, res, next) => {
  const jsonSchema = loadSchemaFileContent(filePath);
  const validate = ajv.compile(jsonSchema);

  // validate the request body
  validate(req.body);

  // if there is any error, send error response
  if (validate.errors) {
    res.statusCode = 422;

    return res.json({ success: false, error: validate.errors[0].message });
  }

  next();
};

export default validateRequestBodySchema;
