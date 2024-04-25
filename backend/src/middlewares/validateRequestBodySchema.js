import { ajv } from "../utils/ajv.js";

/**
 * Middleware to validate request body JSON schema.
 *
 * @param {string} schemaKey The key of the schema
 */
const validateRequestBodySchema = (schemaKey) => async (req, res, next) => {
  const validate = ajv.getSchema(schemaKey);

  // validate the request body
  validate(req.body);

  // if there is any error, send error response
  if (validate.errors) {
    res.statusCode = 422;

    const errors = [];
    validate.errors.forEach((error) => {
      errors.push(error.message);
    });

    return res.json({ success: false, errors: errors });
  }

  next();
};

export default validateRequestBodySchema;
