import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    port: 3000,
    corsHeader: ["Link", "Content-Disposition"],
    corsOrigin: "http://localhost:5173",
    corsAllowedMethods: ["GET", "PUT", "DELETE", "POST"],
    cosmosDbURI: process.env.COSMOSDB_URI,
    cosmosDbAuthKey: process.env.COSMOSDB_AUTHKEY,
  },
};
