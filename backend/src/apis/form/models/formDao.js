import { CosmosClient } from "@azure/cosmos";
import { GET_OPTIONAL_FORM_FORMAT } from "./queries.js";
import NotFoundError from "../../../utils/errors/NotFoundError.js";
import { cosmosClient } from "../../../config/cosmosdb.js";
import { DB_NAME, OPTIONAL_FORMS_CONTAINER } from "../../../utils/constant.js";

class FormDao {
  /**
   *
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   */
  constructor(cosmosClient, databaseId, containerId) {
    this.container = cosmosClient.database(databaseId).container(containerId);
    this.optionalFormFormatId = "tdwBpPtD7lp5XvCg";
  }

  async getOptionalFormFormat() {
    const querySpec = {
      query: GET_OPTIONAL_FORM_FORMAT,
      parameters: [
        {
          name: "@id",
          value: this.optionalFormFormatId,
        },
      ],
    };

    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();

    if (resources.length === 0) {
      throw new NotFoundError("optional form not found");
    }

    return resources[0];
  }

  async patchOptionalFormFormat(newFormat) {
    const operations = [{ op: "replace", path: "/format", value: newFormat }];

    await this.container
      .item(this.optionalFormFormatId, this.optionalFormFormatId)
      .patch(operations);
  }
}

const formDao = new FormDao(cosmosClient, DB_NAME, OPTIONAL_FORMS_CONTAINER);

export default formDao;
