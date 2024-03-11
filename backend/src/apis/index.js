import TaskRoutes from "./tasks/handlers/index.js";

export default (app) => {
  app.use("/tasks", TaskRoutes);
};
