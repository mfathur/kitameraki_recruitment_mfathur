import { FORM_TYPES } from "../utils/constants";
import DatePickerComponent from "./DatePickerComponent";
import SpinButtonComponent from "./SpinButtonComponent";
import TextFieldComponent from "./TextFieldComponent";

type Props = {
  fields: FormFieldMetadata[];
  onDrop: (field: FormFieldMetadata) => void;
};
const OptionalFields = ({ fields, onDrop }: Props) => {
  const renderFormFields = (field: FormFieldMetadata, index: number) => {
    switch (field.type) {
      case FORM_TYPES.DATE:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <DatePickerComponent onDrop={onDrop} />
          </div>
        );
      case FORM_TYPES.SPIN:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <SpinButtonComponent onDrop={onDrop} />
          </div>
        );
      case FORM_TYPES.TEXT:
        return (
          <div key={`${index}-${field}`} className="w-full">
            <TextFieldComponent onDrop={onDrop} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-y-4">{fields.map(renderFormFields)}</div>
  );
};

export default OptionalFields;
