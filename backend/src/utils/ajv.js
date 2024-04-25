import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";

/**
 *  Get all subdirectories that included in `apis` directory
 *
 * @returns {string[]} list of domains
 */
const getAllAPIDomains = () => {
  const apisPath = path.join(process.cwd(), "src/apis");
  return fs
    .readdirSync(apisPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

/**
 * Load content from JSON schema file in a domain
 *
 * @param {string} domain
 * @returns {string}
 */
const loadJsonSchemaFrom = (domain) => {
  const schemaPath = path.join(
    process.cwd(),
    "src/apis",
    domain,
    "/schema.json"
  );

  const fileNotExists = !fs.existsSync(schemaPath);
  if (fileNotExists) return;

  return JSON.parse(fs.readFileSync(schemaPath, "utf8"));
};

/**
 * Load all JSON schemas in every domain
 *
 * @returns {string[]}
 */
const loadAllJsonSchemas = () => {
  const schemas = [];

  const domains = getAllAPIDomains();
  domains.forEach((domain) => {
    const schema = loadJsonSchemaFrom(domain);
    // if exists
    if (schema) {
      schemas.push(schema);
    }
  });

  return schemas;
};

/**
 * Instantiate ajv instance
 *
 * @returns {Ajv} ajv
 */
const initAjv = () => {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  const jsonSchemas = loadAllJsonSchemas();

  jsonSchemas.forEach((jsonSchema) => {
    ajv.addSchema(jsonSchema.definitions);
    for (const schema in jsonSchema.schemas) {
      ajv.addSchema(jsonSchema.schemas[schema], schema);
    }
  });

  return ajv;
};

/**
 * Ajv instance
 */
export const ajv = initAjv();
