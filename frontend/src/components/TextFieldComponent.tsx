import { Input, Label, useId } from "@fluentui/react-components";
import DroppableZone from "./DroppableZone";
import { useState } from "react";

type Props = {
  onDrop: (field: FormFieldMetadata) => void;
};

const TextFieldComponent = ({ onDrop }: Props) => {
  const id = useId();

  const [showRightDroppableZone, setShowRightDroppableZone] = useState(false);
  const [showLeftDroppableZone, setShowLeftDroppableZone] = useState(false);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Get the x-coordinate of the mouse relative to the component
    const mouseX = e.nativeEvent.offsetX;

    const componentWidth = e.currentTarget.clientWidth;

    const isOnRight = mouseX > componentWidth / 2;
    if (isOnRight) {
      // show right droppable zone
      setShowRightDroppableZone(true);
      setShowLeftDroppableZone(false);
    } else {
      // show left droppable zone
      setShowRightDroppableZone(false);
      setShowLeftDroppableZone(true);
    }
  };

  const handleMouseLeave = () => {
    // hide right&left droppableZone
    setShowLeftDroppableZone(false);
    setShowRightDroppableZone(false);
  };

  return (
    <div className="flex gap-x-4 items-end">
      {showLeftDroppableZone ? <DroppableZone onDrop={onDrop} /> : null}
      <div
        className="w-full"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <Label className="block" htmlFor={id}>
          input
        </Label>
        <Input className="w-full" type="text" id={id} />
      </div>
      {showRightDroppableZone ? <DroppableZone onDrop={onDrop} /> : null}
    </div>
  );
};

export default TextFieldComponent;
