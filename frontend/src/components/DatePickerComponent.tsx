import { DatePicker } from "@fluentui/react";
import { Field } from "@fluentui/react-components";
import DroppableZone from "./DroppableZone";
import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { FORM_TYPES } from "../utils/constants";

type Props = {
  onDrop: (field: FormFieldMetadata) => void;
};

const DatePickerComponent = ({ onDrop }: Props) => {
  const [showRightDroppableZone, setShowRightDroppableZone] = useState(false);
  const [showLeftDroppableZone, setShowLeftDroppableZone] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: [FORM_TYPES.DATE, FORM_TYPES.SPIN, FORM_TYPES.TEXT],
    hover(_, monitor) {
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
      {showLeftDroppableZone ? <DroppableZone onDrop={onDrop} /> : null}
      <div className="w-full">
        <Field className="w-full" label="Select a date">
          <DatePicker placeholder="Select a date..." />
        </Field>
      </div>

      {showRightDroppableZone ? <DroppableZone onDrop={onDrop} /> : null}
    </div>
  );
};

export default DatePickerComponent;
