import Ajv from "ajv";
import { createRequire } from "module";
import path from "path";

/**
 * JSON schema validator instance
 */
export const ajv = new Ajv();

/**
 * Helper function to load json schema for validation
 * @param {string} filePath
 */
export const loadSchemaFileContent = (filePath) => {
  const fileLocation = path.join(process.cwd(), "src/apis", filePath);

  const require = createRequire(import.meta.url);
  const schema = require(fileLocation);

  return schema;
};
