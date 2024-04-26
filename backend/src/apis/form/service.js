class FormService {
  constructor(model) {
    this.model = model;
  }

  async getOptionalFormFormat() {
    return await this.model.getOptionalFormFormat();
  }

  async editOptionalFormFormat(newFormat) {
    await this.model.patchOptionalFormFormat(newFormat);
  }
}

export default FormService;
