class TaskService {
  constructor(model) {
    this.model = model;
  }

  async getAllTasks() {
    return await this.model.getAll();
  }

  async getTaskBy(id) {
    return await this.model.getBy(id);
  }

  async deleteTaskBy(id) {
    return await this.model.deleteBy(id);
  }
}

export default TaskService;
