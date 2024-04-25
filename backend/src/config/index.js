import appConfig from "./appConfig.js";
import dotenv from "dotenv";

dotenv.config();

const config = appConfig[process.env.NODE_ENV];

export default config;
