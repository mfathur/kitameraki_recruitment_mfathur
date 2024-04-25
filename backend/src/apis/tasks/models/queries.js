export const GET_TASK_BY_ID =
  "SELECT c.id, c.title, c.description, c.optionals FROM c WHERE c.id=@id";
export const GET_TOTAL_TASK_COUNT =
  "SELECT VALUE COUNT(1) FROM c WHERE c.is_deleted!=true AND (IS_NULL(c.deleted) OR NOT IS_DEFINED(c.deleted))";
export const GET_PAGINATED_TASKS =
  "SELECT c.id, c.title, c.description, c.optionals FROM c WHERE c.is_deleted!=true ORDER BY c._ts DESC OFFSET @offset LIMIT @limit";
