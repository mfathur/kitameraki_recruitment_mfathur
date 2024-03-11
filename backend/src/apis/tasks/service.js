class TaskService {
  constructor(model) {
    this.model = model;
  }

  async getAllTasks() {
    return await this.model.getAll();
  }
}

export default TaskService;
