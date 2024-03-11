import NotFoundError from "../../../utils/errors/NotFoundError.js";

class Task {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  async getAll() {
    return this.tasks;
  }

  async getBy(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundError("task not found");
    }

    const task = this.tasks[index];
    return task;
  }
}

const task = new Task();

export default task;
