import { useEffect, useState } from "react";
import { DropPositionType } from "../utils/constants";
import axiosClient from "../network/apiClient";
import { nanoid } from "nanoid";

const useFormSetting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveSucceed, setIsSaveSucceed] = useState(false);

  const [error, setError] = useState<string | unknown>();

  const [optionalFields, setOptionalFields] = useState<FormFieldMetadata[][]>(
    []
  );

  useEffect(() => {
    const getOptionalFormFormat = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get("/form/optional");
        const payload = await response.data;
        const optionalFormFormat = payload.data[
          "format"
        ] as FormFieldMetadata[][];
        setOptionalFields(optionalFormFormat);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getOptionalFormFormat();
  }, []);

  const saveFormOptionalFormat = async () => {
    setIsSaveSucceed(false);
    try {
      const requestBody = {
        format: optionalFields,
      };

      const response = await axiosClient.patch("/form/optional", requestBody);
      const statusCode = response.status;
      if (statusCode === 200) {
        setIsSaveSucceed(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  const removeFieldFromPreviousPosition = (
    fields: FormFieldMetadata[][],
    field: FormFieldMetadata
  ) => {
    for (let i = 0; i < fields.length; i++) {
      const idx = fields[i].findIndex(
        (existingField) => existingField.id === field.id
      );
      if (idx !== -1) {
        fields[i].splice(idx, 1);
        break;
      }
    }

    return fields;
  };

  const addFieldOnNewRow = (field: FormFieldMetadata) => {
    setOptionalFields((prev) => {
      let newState = [...prev];
      if (field.id) {
        //  if existing field will change its position, remove from the prev position first
        newState = removeFieldFromPreviousPosition(newState, field);
      } else {
        // if it is the new field
        const uid = nanoid();
        field.id = uid;
        field.label = `${field.type}-${uid}`;
      }

      newState.push([{ ...field }]);
      return newState.filter((fieldsInRow) => fieldsInRow.length !== 0);
    });
  };

  const addFieldOnExistingRow = (
    field: FormFieldMetadata,
    rowIdx: number,
    dropPosition: DropPositionType
  ) => {
    setOptionalFields((prev) => {
      let newState = [...prev];

      if (field.id) {
        //  if existing field will change its position, remove from the prev position first
        newState = removeFieldFromPreviousPosition(newState, field);
      } else {
        // if it is the new field
        const uid = nanoid();
        field.id = uid;
        field.label = `${field.type}-${uid}`;
      }

      if (dropPosition === DropPositionType.LEFT) {
        newState[rowIdx].unshift(field);
      } else if (dropPosition === DropPositionType.RIGHT) {
        newState[rowIdx].push(field);
      }

      return newState.filter((fieldsInRow) => fieldsInRow.length !== 0);
    });
  };

  const handleFieldPropertiesChange = (
    field: FormFieldMetadata,
    rowIdx: number
  ) => {
    setOptionalFields((prev) => {
      const newState = [...prev];
      const index = newState[rowIdx].findIndex(
        (existingField) => existingField.id === field.id
      );

      newState[rowIdx][index] = field;

      return newState;
    });
  };

  const onSwapRow = (fromIdx: number, toIdx: number) => {
    setOptionalFields((prev) => {
      const newState = [...prev];
      const temp = newState[fromIdx];
      newState[fromIdx] = newState[toIdx];
      newState[toIdx] = temp;
      return newState;
    });
  };

  return {
    optionalFields,
    isLoading,
    error,
    isSaveSucceed,
    addFieldOnNewRow,
    addFieldOnExistingRow,
    saveFormOptionalFormat,
    handleFieldPropertiesChange,
    onSwapRow,
  };
};

export default useFormSetting;
