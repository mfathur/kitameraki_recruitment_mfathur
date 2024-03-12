import { FaGear, FaPlus } from "react-icons/fa6";
import ItemTask from "../components/ItemTask";
import { useEffect, useState } from "react";
import axiosClient from "../network/apiClient";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getPaginatedTasks = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/tasks");

        const payload = await response.data;
        setTasks(payload.data as Task[]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getPaginatedTasks();
  }, []);

  return (
    <main className="p-5 flex flex-col">
      <div className="text-center mt-8">
        <h1 className="font-bold text-4xl">Tasks</h1>
        <p className="mt-2">Let's get things done!</p>
      </div>
      <div className="mt-14 self-center flex items-center gap-3 ">
        <button className="bg-blue-500 py-2 px-4 rounded-full text-white font-medium flex items-center gap-2 hover:bg-blue-400 transition-all">
          <FaPlus />
          Add Task
        </button>
        <button className="text-blue-500 p-3 rounded-full border border-blue-500 font-medium hover:bg-blue-300 transition-all">
          <FaGear />
        </button>
      </div>
      {loading && !error ? (
        <Spinner className="self-center mt-24" />
      ) : (
        <div className="flex gap-4 flex-wrap mt-10 justify-center ">
          {tasks.map((task, idx) => (
            <ItemTask key={`${idx}-${task.id}`} task={task} />
          ))}
        </div>
      )}
      {!loading && error ? (error as string) : null}
    </main>
  );
};

export default HomePage;
