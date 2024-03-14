import { FaGear, FaPlus } from "react-icons/fa6";
import ItemTask from "../components/ItemTask";
import { useState, useCallback, useRef, useEffect } from "react";
import Spinner from "../components/Spinner";
import CreateTaskModal from "../components/CreateTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal";
import usePaginatedTasks from "../hooks/usePaginatedTasks";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const {
    isLoading,
    error,
    hasMore,
    tasks,
    errorOnAction,
    deleteTask,
    insertTask,
    updateTask,
  } = usePaginatedTasks(page);

  useEffect(() => {
    if (errorOnAction) {
      alert(errorOnAction);
    }
  }, [errorOnAction]);

  const [focusedTask, setFocusedTask] = useState<Task | null>(null);

  const [isCreateTaskModalOpened, setIsCreateTaskModalOpened] = useState(false);
  const [isUpdateTaskModalOpened, setIsUpdateTaskModalOpened] = useState(false);

  // handle infinite scroll
  const observer = useRef<IntersectionObserver | null>();
  const lastTaskElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const navigate = useNavigate();

  return (
    <main className="p-5 flex flex-col">
      <div className="text-center mt-8 ">
        <h1 className="font-bold text-4xl">Tasks</h1>
        <p className="mt-2">Let's get things done!</p>
      </div>
      <div className="mt-14 self-center flex items-center gap-3 ">
        <button
          className="btn-contained py-2 px-4 rounded-full items-center flex gap-x-2"
          onClick={() => {
            setIsCreateTaskModalOpened(true);
          }}
        >
          <FaPlus />
          Add Task
        </button>
        <button
          onClick={() => {
            navigate("/setting");
          }}
          className="btn-outlined p-3 rounded-full border border-blue-500 font-medium hover:bg-blue-300 transition-all"
        >
          <FaGear />
        </button>
      </div>

      <div className="flex gap-4 flex-wrap mt-10 justify-center mb-20 ">
        {tasks.map((task, idx) => {
          if (tasks.length === idx + 1) {
            return (
              <div ref={lastTaskElementRef} key={`${idx}-${task.id}`}>
                <ItemTask
                  task={task}
                  onBtnEditTaskClicked={(task: Task) => {
                    setFocusedTask(task);
                    setIsUpdateTaskModalOpened(true);
                  }}
                  onBtnDeleteTaskClicked={async (task: Task) => {
                    await deleteTask(task);
                  }}
                />
              </div>
            );
          }
          return (
            <ItemTask
              key={`${idx}-${task.id}`}
              task={task}
              onBtnEditTaskClicked={(task: Task) => {
                setFocusedTask(task);
                setIsUpdateTaskModalOpened(true);
              }}
              onBtnDeleteTaskClicked={async () => {
                await deleteTask(task);
              }}
            />
          );
        })}
      </div>
      {error ? (error as string) : null}
      {isLoading ? <Spinner className="self-center mt-24" /> : null}

      {isCreateTaskModalOpened ? (
        <CreateTaskModal
          onBtnCloseClicked={() => {
            setIsCreateTaskModalOpened(false);
          }}
          onBtnCreateClicked={async (task: Task) => {
            setIsCreateTaskModalOpened(false);
            await insertTask(task);
          }}
        />
      ) : null}

      {isUpdateTaskModalOpened ? (
        <UpdateTaskModal
          task={focusedTask as Task}
          onBtnCloseClicked={() => {
            setIsUpdateTaskModalOpened(false);
          }}
          onBtnUpdateClicked={async (task: Task) => {
            setIsUpdateTaskModalOpened(false);
            await updateTask(task);
          }}
        />
      ) : null}
    </main>
  );
};

export default HomePage;
