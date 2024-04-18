import { Label, SpinButton, useId } from "@fluentui/react-components";
import { useRef, useState } from "react";
import DroppableZone from "./DroppableZone";
import { useDrop } from "react-dnd";
import { DropPositionType, FORM_TYPES } from "../utils/constants";

type Props = {
  onDrop: (field: FormFieldMetadata, dropPosition: DropPositionType) => void;
  isAbleToAddField: boolean;
};

const SpinButtonComponent = ({ onDrop, isAbleToAddField }: Props) => {
  const id = useId();

  const [showRightDroppableZone, setShowRightDroppableZone] = useState(false);
  const [showLeftDroppableZone, setShowLeftDroppableZone] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: [FORM_TYPES.DATE, FORM_TYPES.SPIN, FORM_TYPES.TEXT],
    hover(_, monitor) {
      if (!isAbleToAddField) {
        return;
      }

      if (!ref.current) {
        return;
      }

      const hoveredArea = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoveredArea.right - hoveredArea.left) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientX = mousePosition!.x - hoveredArea.left;

      if (hoverMiddleX < hoverClientX) {
        setShowLeftDroppableZone(false);
        setShowRightDroppableZone(true);
      } else {
        setShowLeftDroppableZone(true);
        setShowRightDroppableZone(false);
      }
    },
    collect: (monitor) => {
      if (!monitor.isOver()) {
        setShowLeftDroppableZone(false);
        setShowRightDroppableZone(false);
      }
    },
  });

  drop(ref);

  return (
    <div ref={ref} className="flex gap-x-4 items-end">
      {showLeftDroppableZone ? (
        <DroppableZone
          onDrop={(field: FormFieldMetadata) => {
            onDrop(field, DropPositionType.LEFT);
          }}
        />
      ) : null}
      <div className="w-full">
        <Label htmlFor={id} className="block ">
          Default SpinButton
        </Label>
        <SpinButton className="w-full" defaultValue={0} min={0} id={id} />
      </div>
      {showRightDroppableZone ? (
        <DroppableZone
          onDrop={(field: FormFieldMetadata) => {
            onDrop(field, DropPositionType.RIGHT);
          }}
        />
      ) : null}
    </div>
  );
};

export default SpinButtonComponent;
