import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DropPositionType, FORM_TYPES } from "../utils/constants";
import DroppableZone from "./DroppableZone";
import TextFieldComponent from "./TextFieldComponent";
import SpinButtonComponent from "./SpinButtonComponent";
import DatePickerComponent from "./DatePickerComponent";

type Props = {
  rowIdx: number;
  fields: FormFieldMetadata[];
  isInFormSetting: boolean;
  task?: Task;
  onFieldValueChange?: (fieldId: string, value: unknown) => void;
  onDrop?: (
    field: FormFieldMetadata,
    index: number,
    dropPosition: DropPositionType
  ) => void;
  onFieldPropertiesChange?: (field: FormFieldMetadata, rowIdx: number) => void;
  onSwapRow?: (fromIdx: number, toIdx: number) => void;
};

const FieldRow = ({
  rowIdx,
  fields,
  isInFormSetting,
  task,
  onFieldValueChange,
  onDrop,
  onFieldPropertiesChange,
  onSwapRow,
}: Props) => {
  const [showRightDroppableZone, setShowRightDroppableZone] = useState(false);
  const [showLeftDroppableZone, setShowLeftDroppableZone] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: FORM_TYPES.ROW,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { rowIdx },
  }));

  const [, drop] = useDrop({
    accept: [FORM_TYPES.DATE, FORM_TYPES.SPIN, FORM_TYPES.TEXT, FORM_TYPES.ROW],
    drop: (item: FormFieldMetadata | FieldRow, monitor) => {
      const isAFieldRow = Object.prototype.hasOwnProperty.call(item, "rowIdx");
      if (isAFieldRow) {
        if (onSwapRow) onSwapRow((item as FieldRow).rowIdx, rowIdx);
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
        if (onDrop)
          onDrop(item as FormFieldMetadata, rowIdx, DropPositionType.RIGHT);
      } else {
        if (onDrop)
          onDrop(item as FormFieldMetadata, rowIdx, DropPositionType.LEFT);
      }
    },
    hover: (item: FormFieldMetadata | FieldRow, monitor) => {
      // if the row already contains 2 field horizontally or not in optional setting page
      // or the dragged item is a field row, disable the droppable zone
      const isAFieldRow = Object.prototype.hasOwnProperty.call(item, "rowIdx");
      if (fields.length === 2 || !isInFormSetting || isAFieldRow) {
        setShowLeftDroppableZone(false);
        setShowRightDroppableZone(false);
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
    canDrop: (item, _) => {
      const isNotAFieldRow = !Object.prototype.hasOwnProperty.call(
        item,
        "rowIdx"
      );
      // if the dragged item is not a row of fields
      if (isNotAFieldRow) {
        if (fields.length === 2) {
          // if the row already contains 2 fields
          const isFieldAlreadyExists = fields.find(
            (existingField) =>
              existingField.id === (item as FormFieldMetadata).id
          );
          // allow drop, to swap the position of the fields in a row
          if (isFieldAlreadyExists) {
            return true;
          }
          return false;
        }
      }

      return true;
    },
  });

  drag(drop(ref));

  // render field form based on its type
  const renderFormFields = (field: FormFieldMetadata, index: number) => {
    switch (field.type) {
      case FORM_TYPES.DATE:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <DatePickerComponent
              field={field}
              onValueChange={(value: Date) => {
                if (onFieldValueChange)
                  onFieldValueChange(field.id, value.toISOString());
              }}
              isDraggable={isInFormSetting}
              initialValue={
                task?.optionals?.[field.id]
                  ? new Date(task?.optionals?.[field.id] as string)
                  : undefined
              }
              onPropertyChange={(field: FormFieldMetadata) => {
                if (onFieldPropertiesChange)
                  onFieldPropertiesChange(field, rowIdx);
              }}
            />
          </div>
        );
      case FORM_TYPES.SPIN:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <SpinButtonComponent
              field={field}
              onValueChange={(value: number) => {
                if (onFieldValueChange) onFieldValueChange(field.id, value);
              }}
              initialValue={(task?.optionals?.[field.id] as number) ?? 0}
              isDraggable={isInFormSetting}
              onPropertyChange={(field: FormFieldMetadata) => {
                if (onFieldPropertiesChange)
                  onFieldPropertiesChange(field, rowIdx);
              }}
            />
          </div>
        );
      case FORM_TYPES.TEXT:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <TextFieldComponent
              field={field}
              onFieldBlur={(value: string) => {
                if (onFieldValueChange) onFieldValueChange(field.id, value);
              }}
              initialValue={(task?.optionals?.[field.id] as string) ?? ""}
              onPropertyChange={(field: FormFieldMetadata) => {
                if (onFieldPropertiesChange)
                  onFieldPropertiesChange(field, rowIdx);
              }}
              isDraggable={isInFormSetting}
            />
          </div>
        );
    }
  };

  return (
    <div
      ref={isInFormSetting ? ref : null}
      className={`flex gap-x-4 justify-center ${
        isDragging ? "opacity-20 cursor-grabbing" : "opacity-100"
      }  ${
        isInFormSetting
          ? "hover:outline hover:outline-primary hover:cursor-grab"
          : ""
      }  `}
    >
      {showLeftDroppableZone ? (
        <DroppableZone
          accept={[FORM_TYPES.DATE, FORM_TYPES.TEXT, FORM_TYPES.SPIN]}
          onDrop={(field: FormFieldMetadata) => {
            if (onDrop) onDrop(field, rowIdx, DropPositionType.LEFT);
          }}
        />
      ) : null}
      {fields.map((field: FormFieldMetadata, index: number) =>
        renderFormFields(field, index)
      )}
      {showRightDroppableZone ? (
        <DroppableZone
          accept={[FORM_TYPES.DATE, FORM_TYPES.TEXT, FORM_TYPES.SPIN]}
          onDrop={(field: FormFieldMetadata) => {
            if (onDrop) onDrop(field, rowIdx, DropPositionType.RIGHT);
          }}
        />
      ) : null}
    </div>
  );
};

export default FieldRow;
