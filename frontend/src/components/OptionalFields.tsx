import { DropPositionType } from "../utils/constants";
import FieldRow from "./FieldRow";

type Props = {
  fields: FormFieldMetadata[][];
  isInFormSetting?: boolean;
  task?: Task;
  onDrop?: (
    field: FormFieldMetadata,
    index: number,
    dropPosition: DropPositionType
  ) => void;
  onFieldValueChange?: (fieldId: string, value: unknown) => void;
  onFieldPropertiesChange?: (field: FormFieldMetadata, rowIdx: number) => void;
  onSwapRow?: (fromIdx: number, toIdx: number) => void;
};

const OptionalFields = ({
  fields,
  task,
  isInFormSetting = false,
  onDrop,
  onFieldValueChange,
  onFieldPropertiesChange,
  onSwapRow,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-0">
      {fields.map((fieldsPerRow, index) => (
        <FieldRow
          key={`${index}-${fieldsPerRow[0].id}`}
          isInFormSetting={isInFormSetting}
          rowIdx={index}
          fields={fieldsPerRow}
          task={task}
          onDrop={onDrop}
          onFieldValueChange={onFieldValueChange}
          onFieldPropertiesChange={onFieldPropertiesChange}
          onSwapRow={onSwapRow}
        />
      ))}
    </div>
  );
};

export default OptionalFields;
