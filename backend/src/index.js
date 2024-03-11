import express from "express";
import http from "http";
import configObj from "./config/index.js";
import dotenv from "dotenv";
import apis from "./apis/index.js";

dotenv.config();
const config = configObj[process.env.NODE_ENV];

const app = express();
app.server = http.createServer(app);

app.use(express.json());

app.get("/", (_, res) => {
  res.send({
    status: "success",
    message: "Hello from task management backend app",
  });
});

apis(app);

const port = process.env.PORT || config.port;
app.server.listen(port, () => {
  console.log(`Server is listening on PORT ${app.server.address().port}`);
});
