import { DatePicker } from "@fluentui/react";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { FORM_TYPES } from "../utils/constants";
import InlineEditableLabel from "./InlineEditableLabel";

type Props = {
  initialValue?: Date;
  field: FormFieldMetadata;
  isDraggable: boolean;
  onValueChange?: (value: Date) => void;
  onPropertyChange?: (field: FormFieldMetadata) => void;
};

const DatePickerComponent = ({
  initialValue,
  field,
  isDraggable,
  onValueChange,
  onPropertyChange,
}: Props) => {
  const [value, setValue] = useState<Date | undefined>(initialValue);
  const isLabelCanBeChanged = isDraggable;

  const handleSelectDate = (date: Date | null | undefined) => {
    if (date) {
      setValue(date);
      if (onValueChange) onValueChange(date);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: FORM_TYPES.DATE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { ...field, type: FORM_TYPES.DATE },
  }));

  return (
    <div
      ref={isDraggable ? drag : null}
      className={`flex gap-x-4 items-end p-2 ${
        isDragging ? "opacity-20" : "opacity-100"
      } ${isDraggable ? "hover:cursor-grab" : ""}`}
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
        <DatePicker
          allowTextInput={false}
          placeholder="Select a date..."
          onSelectDate={handleSelectDate}
          value={value}
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
