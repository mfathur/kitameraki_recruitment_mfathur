import { Label, SpinButton, useId } from "@fluentui/react-components";
import { useState } from "react";
import DroppableZone from "./DroppableZone";

type Props = {
  onDrop: (field: FormFieldMetadata) => void;
};

const SpinButtonComponent = ({ onDrop }: Props) => {
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
        <Label htmlFor={id} className="block ">
          Default SpinButton
        </Label>
        <SpinButton className="w-full" defaultValue={0} min={0} id={id} />
      </div>
      {showRightDroppableZone ? <DroppableZone onDrop={onDrop} /> : null}
    </div>
  );
};

export default SpinButtonComponent;
