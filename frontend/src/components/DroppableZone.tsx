import { useDrop } from "react-dnd";

type Props = {
  className?: string;
  onDrop: (field: FormFieldMetadata) => void;
  accept: string[];
};

const DroppableZone = ({ className, onDrop, accept }: Props) => {
  const [, drop] = useDrop(
    () => ({
      accept: accept,
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
