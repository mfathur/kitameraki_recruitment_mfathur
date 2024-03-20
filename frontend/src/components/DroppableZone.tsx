import { useDrop } from "react-dnd";
import { FORM_TYPES } from "../utils/constants";

type Props = {
  className?: string;
  onDrop: (field: FormFieldMetadata) => void;
};

const DroppableZone = ({ className, onDrop }: Props) => {
  const [, drop] = useDrop(
    () => ({
      accept: [FORM_TYPES.DATE, FORM_TYPES.SPIN, FORM_TYPES.TEXT],
      drop: onDrop,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div
      ref={drop}
      className={`min-h-10 flex items-center justify-center w-full bg-primary bg-opacity-5 border border-dashed border-primary ${className} rounded-lg`}
    >
      <p className="text-primary">Drop component here</p>
    </div>
  );
};

export default DroppableZone;
