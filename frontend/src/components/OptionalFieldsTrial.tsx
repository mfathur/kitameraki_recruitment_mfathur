import { DropPositionType, FORM_TYPES } from "../utils/constants";
import DatePickerComponent from "./DatePickerComponent";
import SpinButtonComponent from "./SpinButtonComponent";
import TextFieldComponent from "./TextFieldComponent";

type Props = {
  fields: Map<number, FormFieldMetadata[]>;
  onDrop: (
    field: FormFieldMetadata,
    index: number,
    dropPosition: DropPositionType
  ) => void;
  onFieldValueChange: (fieldId: string, value: unknown) => void;
  task?: Task;
};
const OptionalFieldsTrial = ({
  fields,
  onDrop,
  onFieldValueChange,
  task,
}: Props) => {
  // render field form based on its type
  const renderFormFields = (
    field: FormFieldMetadata,
    rowIdx: number,
    index: number,
    isAbleToAddField: boolean,
    onFieldValueChange: (fieldId: string, value: unknown) => void
  ) => {
    switch (field.type) {
      case FORM_TYPES.DATE:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <DatePickerComponent
              field={field}
              onDrop={(
                field: FormFieldMetadata,
                dropPosition: DropPositionType
              ) => {
                onDrop(field, rowIdx, dropPosition);
              }}
              isAbleToAddField={isAbleToAddField}
              onFieldBlur={(value: Date) => {
                onFieldValueChange(field.id, value.toISOString());
              }}
              // initialValue={
              //   task
              //     ? new Date(task?.optionals?.[field.id] as string)
              //     : undefined
              // }
            />
          </div>
        );
      case FORM_TYPES.SPIN:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <SpinButtonComponent
              field={field}
              onDrop={(
                field: FormFieldMetadata,
                dropPosition: DropPositionType
              ) => {
                onDrop(field, rowIdx, dropPosition);
              }}
              isAbleToAddField={isAbleToAddField}
              onFieldBlur={(value: number) => {
                onFieldValueChange(field.id, value);
              }}
              initialValue={task?.optionals?.[field.id] as number}
            />
          </div>
        );
      case FORM_TYPES.TEXT:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <TextFieldComponent
              field={field}
              onDrop={(
                field: FormFieldMetadata,
                dropPosition: DropPositionType
              ) => {
                onDrop(field, rowIdx, dropPosition);
              }}
              isAbleToAddField={isAbleToAddField}
              onFieldBlur={(value: string) => {
                onFieldValueChange(field.id, value);
              }}
              initialValue={task?.optionals?.[field.id] as string}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {Array.from(fields.entries()).map(([key, values]) => (
        <div key={key} className="flex gap-x-4">
          {values.length === 2
            ? // if in one row already have 2 fields horizontally, make that row unable to add more field
              values.map((field: FormFieldMetadata, index: number) =>
                renderFormFields(field, key, index, false, onFieldValueChange)
              )
            : values.map((field: FormFieldMetadata, index: number) =>
                renderFormFields(field, key, index, true, onFieldValueChange)
              )}
        </div>
      ))}
    </div>
  );
};

export default OptionalFieldsTrial;
