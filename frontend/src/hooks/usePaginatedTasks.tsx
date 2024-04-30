import { useEffect, useState } from "react";
import axiosClient from "../network/apiClient";

const usePaginatedTasks = (page: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);
  const [errorOnAction, setErrorOnAction] = useState<string | unknown>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const removeDuplicateTasks = (tasks: Task[]) => {
    const jsonObj = tasks.map((task) => JSON.stringify(task));
    const uniqueSet = new Set(jsonObj);
    const uniqueTasks = Array.from(uniqueSet).map((task) => JSON.parse(task));

    setTasks(uniqueTasks);
  };

  useEffect(() => {
    const getPaginatedTask = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get(
          `/tasks?page=${page}&per_page=10`
        );

        const payload = await response.data;

        const metadata = payload.metadata as PaginationMetadata;
        const newTasks = [...tasks, ...(payload.data as Task[])];
        removeDuplicateTasks(newTasks);

        if (metadata.page === metadata.page_count) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPaginatedTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const deleteTask = async (task: Task) => {
    try {
      const response = await axiosClient.delete(`/tasks/${task.id}`);
      const statusCode = response.status;
      if (statusCode === 200) {
        setTasks((prevData) => prevData.filter((data) => data.id !== task.id));
      }
    } catch (error) {
      setErrorOnAction(error);
    }
  };

  const insertTask = async (task: Task) => {
    try {
      const response = await axiosClient.post(`/tasks`, {
        title: task.title,
        description: task.description,
        optionals: task.optionals,
      });
      const statusCode = response.status;
      const payload = await response?.data.data;
      task.id = payload.id;

      if (statusCode === 201) {
        setTasks((prevData) => [...prevData, task]);
      }
    } catch (error) {
      setErrorOnAction(error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const response = await axiosClient.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        optionals: task.optionals,
      });

      const statusCode = response.status;
      if (statusCode === 200) {
        const index = tasks.findIndex((item) => item.id === task.id);
        const newData = [...tasks];
        newData[index] = task;
        setTasks(newData);
      }
    } catch (error) {
      setErrorOnAction(error);
    }
  };

  return {
    isLoading,
    error,
    hasMore,
    tasks,
    errorOnAction,
    deleteTask,
    insertTask,
    updateTask,
  };
};

export default usePaginatedTasks;
