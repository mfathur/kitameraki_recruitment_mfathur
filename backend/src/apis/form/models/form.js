import { dummyFormOptionalFormat } from "../../../utils/dummyData.js";

class Form {
  constructor(optionalFormFormat = new Map()) {
    this.optionalFormFormat = optionalFormFormat;
  }

  async getOptionalFormFormat() {
    return this.optionalFormFormat;
  }

  async updateOptionalFormFormat(newFormat) {
    this.optionalFormFormat = newFormat;
  }
}

const form = new Form(dummyFormOptionalFormat);

export default form;
