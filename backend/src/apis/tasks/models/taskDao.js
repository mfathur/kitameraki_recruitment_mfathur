import { CosmosClient } from "@azure/cosmos";
import { cosmosClient } from "../../../config/cosmosdb.js";
import { DB_NAME, TASKS_CONTAINER } from "../../../utils/constant.js";
import { nanoid } from "nanoid";
import NotFoundError from "../../../utils/errors/NotFoundError.js";
import {
  GET_PAGINATED_TASKS,
  GET_TASK_BY_ID,
  GET_TOTAL_TASK_COUNT,
} from "./queries.js";

class TaskDao {
  /**
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   */
  constructor(cosmosClient, databaseId, containerId) {
    this.container = cosmosClient.database(databaseId).container(containerId);
    this.partitionKey = "id";
  }

  async getPaginated(page, pageSize) {
    const offset = (page - 1) * pageSize;

    const querySpec = {
      query: GET_PAGINATED_TASKS,
      parameters: [
        { name: "@offset", value: offset },
        {
          name: "@limit",
          value: Number(pageSize),
        },
      ],
    };

    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();

    const totalData = await this.#getTotalData();

    const data = {
      tasks: resources,
      metadata: {
        page: Number(page),
        per_page: Number(pageSize),
        page_count: Math.ceil(totalData / pageSize),
        total_count: totalData,
      },
    };

    return data;
  }

  async #getTotalData() {
    const querySpec = {
      query: GET_TOTAL_TASK_COUNT,
    };

    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();

    return resources[0];
  }

  async getBy(id) {
    const querySpec = {
      query: GET_TASK_BY_ID,
      parameters: [
        {
          name: "@id",
          value: id,
        },
      ],
    };

    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();

    if (resources.length === 0) {
      throw new NotFoundError("task not found");
    }

    return resources[0];
  }

  async deleteBy(id) {
    const data = await this.getBy(id);
    data.is_deleted = true;

    await this.container.items.upsert(data);
  }

  async insert(task) {
    const id = nanoid();
    task["id"] = id;

    await this.container.items.create(task);

    return id;
  }

  async update(id, newData) {
    newData.id = id;
    await this.container.items.upsert(newData);
  }
}

const taskDao = new TaskDao(cosmosClient, DB_NAME, TASKS_CONTAINER);

export default taskDao;
