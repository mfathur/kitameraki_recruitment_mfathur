import NotFoundError from "../../../utils/errors/NotFoundError.js";
import { nanoid } from "nanoid";
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

  async deleteBy(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundError("task not found");
    }

    this.tasks.splice(index, 1);
  }

  async insert(task) {
    const id = nanoid();
    task["id"] = id;
    this.tasks.push(task);

    return id;
  }

  async update(id, newData) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundError("task not found");
    }

    this.tasks[index] = newData;
  }
}

const task = new Task();

export default task;
