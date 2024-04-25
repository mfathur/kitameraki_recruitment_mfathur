import { CosmosClient } from "@azure/cosmos";
import { DB_NAME } from "../utils/constant.js";
import config from "./index.js";

/**
 * @type {CosmosClient}
 */
export let cosmosClient = new CosmosClient({
  endpoint: config.cosmosDbURI,
  key: config.cosmosDbAuthKey,
});
