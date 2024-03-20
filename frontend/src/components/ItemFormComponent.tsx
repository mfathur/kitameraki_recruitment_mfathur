import { useDrag } from "react-dnd";
import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  name: string;
  type: string;
};

const ItemFormComponent = ({ Icon, name, type }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { type },
  }));

  return (
    <div
      ref={drag}
      className={`flex flex-col bg-gray-100 gap-y-2 items-center justify-center p-2 ${
        isDragging ? "cursor-grabbing" : ""
      } hover:cursor-grab`}
    >
      <Icon className="text-3xl" />
      <p>{name}</p>
    </div>
  );
};

export default ItemFormComponent;
