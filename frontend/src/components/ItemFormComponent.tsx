import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  name: string;
};

const ItemFormComponent = ({ Icon, name }: Props) => {
  return (
    <div className="flex flex-col bg-gray-100 gap-y-2 items-center justify-center p-2">
      <Icon className="text-3xl" />
      <p>{name}</p>
    </div>
  );
};

export default ItemFormComponent;
