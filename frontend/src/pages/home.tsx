import { FaGear, FaPlus } from "react-icons/fa6";
import ItemTask from "../components/ItemTask";

// dummy data
const tasks: Task[] = [
  {
    id: "1",
    title: "lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem massa etiam eget eget in sagittis sagittis nulla.",
  },
  {
    id: "2",
    title: "lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem massa etiam eget eget in sagittis sagittis nulla.",
  },
  {
    id: "3",
    title: "lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem massa etiam eget eget in sagittis sagittis nulla.",
  },
];

const HomePage = () => {
  return (
    <main className="p-5 flex flex-col">
      <div className="text-center mt-8">
        <h1 className="font-bold text-4xl">Tasks</h1>
        <p className="mt-2">Let's get things done!</p>
      </div>
      <div className="mt-14 self-end flex items-center gap-3 mx-20">
        <button className="bg-blue-500 py-2 px-4 rounded-full text-white font-medium flex items-center gap-2 hover:bg-blue-400 transition-all">
          <FaPlus />
          Add Task
        </button>
        <button className="text-blue-500 p-3 rounded-full border border-blue-500 font-medium hover:bg-blue-300 transition-all">
          <FaGear />
        </button>
      </div>
      <div className="flex gap-4 flex-wrap mt-10 justify-center ">
        {tasks.map((task, idx) => (
          <ItemTask key={`${idx}-${task.id}`} task={task} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
