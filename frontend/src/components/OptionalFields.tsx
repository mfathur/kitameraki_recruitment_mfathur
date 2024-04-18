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
};
const OptionalFields = ({ fields, onDrop }: Props) => {
  // render field form based on its type
  const renderFormFields = (
    field: FormFieldMetadata,
    rowIdx: number,
    index: number,
    isAbleToAddField: boolean
  ) => {
    switch (field.type) {
      case FORM_TYPES.DATE:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <DatePickerComponent
              onDrop={(
                field: FormFieldMetadata,
                dropPosition: DropPositionType
              ) => {
                onDrop(field, rowIdx, dropPosition);
              }}
              isAbleToAddField={isAbleToAddField}
            />
          </div>
        );
      case FORM_TYPES.SPIN:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <SpinButtonComponent
              onDrop={(
                field: FormFieldMetadata,
                dropPosition: DropPositionType
              ) => {
                onDrop(field, rowIdx, dropPosition);
              }}
              isAbleToAddField={isAbleToAddField}
            />
          </div>
        );
      case FORM_TYPES.TEXT:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <TextFieldComponent
              onDrop={(
                field: FormFieldMetadata,
                dropPosition: DropPositionType
              ) => {
                onDrop(field, rowIdx, dropPosition);
              }}
              isAbleToAddField={isAbleToAddField}
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
                renderFormFields(field, key, index, false)
              )
            : values.map((field: FormFieldMetadata, index: number) =>
                renderFormFields(field, key, index, true)
              )}
        </div>
      ))}
    </div>
  );
};

export default OptionalFields;
