import { Input, useId } from "@fluentui/react-components";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { FORM_TYPES } from "../utils/constants";
import InlineEditableLabel from "./InlineEditableLabel";

type Props = {
  field: FormFieldMetadata;
  initialValue?: string;
  onFieldBlur?: (value: string) => void;
  isDraggable: boolean;
  onPropertyChange?: (field: FormFieldMetadata) => void;
};

const TextFieldComponent = ({
  initialValue = "",
  field,
  onFieldBlur,
  isDraggable,
  onPropertyChange,
}: Props) => {
  const id = useId();
  const isLabelCanBeChanged = isDraggable;

  const [value, setValue] = useState(initialValue);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: FORM_TYPES.TEXT,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { ...field, type: FORM_TYPES.TEXT },
  }));

  return (
    <div
      ref={isDraggable ? drag : null}
      className={`flex gap-x-4 items-end p-2`}
    >
      <div
        className={`w-full ${
          isDragging ? "opacity-20 cursor-grabbing" : "opacity-100 "
        } ${isDraggable ? "hover:cursor-grab" : ""}`}
      >
        <InlineEditableLabel
          initialLabel={field.label}
          changeAble={isLabelCanBeChanged}
          onBlur={(newLabel) => {
            if (onPropertyChange)
              onPropertyChange({ ...field, label: newLabel });
          }}
        />
        <Input
          className="w-full"
          type="text"
          id={id}
          onBlur={() => {
            if (onFieldBlur) onFieldBlur(value);
          }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default TextFieldComponent;
