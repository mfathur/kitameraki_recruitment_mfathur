class TaskService {
  constructor(model) {
    this.model = model;
  }

  async addTask(data) {
    return await this.model.insert(data);
  }

  async editTask(id, data) {
    return await this.model.update(id, data);
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
