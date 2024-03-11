class Task {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  async getAll() {
    return this.tasks;
  }
}

const task = new Task();

export default task;
