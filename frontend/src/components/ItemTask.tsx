import { FaPen, FaTrash } from "react-icons/fa6";

type Props = {
  task: Task;
  onBtnEditTaskClicked: (task: Task) => void;
  onBtnDeleteTaskClicked: (task: Task) => void;
};

const ItemTask = ({
  task,
  onBtnEditTaskClicked,
  onBtnDeleteTaskClicked,
}: Props) => {
  const handleBtnDeleteClick = async () => {
    onBtnDeleteTaskClicked(task);
  };

  const handleBtnUpdateClick = async () => {
    onBtnEditTaskClicked(task);
  };

  return (
    <div className="block md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow w-full">
      <div className="mb-2 flex justify-between gap-4">
        <h5 className=" text-2xl font-bold tracking-tight text-gray-900 ">
          {task.title}
        </h5>
        <div className="flex gap-x-4 text-gray-300">
          <button onClick={handleBtnDeleteClick}>
            <FaTrash className="hover:cursor-pointer hover:text-blue-500" />
          </button>
          <button onClick={handleBtnUpdateClick}>
            <FaPen className="hover:cursor-pointer hover:text-blue-500" />
          </button>
        </div>
      </div>

      <p className="font-normal text-gray-700 ">{task.description}</p>
    </div>
  );
};

export default ItemTask;
