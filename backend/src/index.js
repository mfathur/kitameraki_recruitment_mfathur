import express from "express";
import http from "http";

const app = express();
app.server = http.createServer(app);

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    status: "success",
    message: "Hello from task management backend app",
  });
});

const port = 3000;
app.server.listen(port, () => {
  console.log(`Server is listening on PORT ${app.server.address().port}`);
});
