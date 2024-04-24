import express from "express";
import http from "http";
import cors from "cors";
import configObj from "./config/index.js";
import dotenv from "dotenv";
import apis from "./apis/index.js";
import errorLogger from "./middlewares/errorLogger.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const config = configObj[process.env.NODE_ENV];

const app = express();
app.server = http.createServer(app);

app.use(express.json());

app.options("*", cors());
app.use(
  cors({
    origin: config.corsOrigin,
    exposedHeaders: config.corsHeader,
    methods: config.corsAllowedMethods,
  })
);

app.get("/", (_, res) => {
  res.send({
    status: "success",
    message: "Hello from task management backend app",
  });
});

apis(app);

app.use(errorLogger);
app.use(errorHandler);

const port = process.env.PORT || config.port;
app.server.listen(port, () => {
  console.log(`Server is listening on PORT ${app.server.address().port}`);
});
