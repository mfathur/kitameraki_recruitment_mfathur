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

  async editTaskProperties(id, data) {
    return await this.model.patch(id, data);
  }

  async getPaginatedTasks(page, pageSize) {
    return await this.model.getPaginated(page, pageSize);
  }

  async getTaskBy(id) {
    return await this.model.getBy(id);
  }

  async deleteTaskBy(id) {
    return await this.model.deleteBy(id);
  }
}

export default TaskService;
