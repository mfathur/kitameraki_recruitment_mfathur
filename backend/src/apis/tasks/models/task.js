import NotFoundError from "../../../utils/errors/NotFoundError.js";
import { nanoid } from "nanoid";
class Task {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  async getPaginated(page, pageSize) {
    const totalData = this.tasks.length;
    const data = {
      tasks: this.tasks.slice((page - 1) * pageSize, page * pageSize),
      metadata: {
        page_count: Math.ceil(totalData / pageSize),
        total_count: totalData,
        page: page,
        per_page: pageSize,
      },
    };

    return data;
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
