import { SpinButton, useId } from "@fluentui/react-components";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { FORM_TYPES } from "../utils/constants";
import InlineEditableLabel from "./InlineEditableLabel";

type Props = {
  field: FormFieldMetadata;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  isDraggable: boolean;
  onPropertyChange?: (field: FormFieldMetadata) => void;
};

const SpinButtonComponent = ({
  initialValue = 0,
  field,
  onValueChange,
  isDraggable,
  onPropertyChange,
}: Props) => {
  const id = useId();
  const isLabelCanBeChanged = isDraggable;

  const [value, setValue] = useState<number>(initialValue);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: FORM_TYPES.SPIN,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { ...field, type: FORM_TYPES.SPIN },
  }));

  return (
    <div
      ref={isDraggable ? drag : null}
      className={`flex gap-x-4${
        isDragging ? "opacity-20 cursor-grabbing" : "opacity-100"
      } ${isDraggable ? "hover:cursor-grab" : ""} p-2`}
    >
      <div className="w-full">
        <InlineEditableLabel
          initialLabel={field.label}
          changeAble={isLabelCanBeChanged}
          onBlur={(newLabel) => {
            if (onPropertyChange)
              onPropertyChange({ ...field, label: newLabel });
          }}
        />
        <SpinButton
          className="w-full"
          min={0}
          id={id}
          value={value}
          onChange={(_, data) => {
            if (data?.displayValue) {
              setValue(Number(data?.displayValue));
              if (onValueChange) onValueChange(Number(data?.displayValue));
            } else {
              setValue(Number(data?.value));
              if (onValueChange) onValueChange(Number(data?.value));
            }
          }}
        />
      </div>
    </div>
  );
};

export default SpinButtonComponent;
