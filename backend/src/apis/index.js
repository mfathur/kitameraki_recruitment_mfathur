import taskRoutes from "./tasks/handlers/index.js";
import formRoutes from "./form/handlers/index.js";

export default (app) => {
  app.use("/tasks", taskRoutes);
  app.use("/form", formRoutes);
};
