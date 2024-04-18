import { useEffect, useState } from "react";
import { DropPositionType } from "../utils/constants";
import axiosClient from "../network/apiClient";

const useFormSetting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveSucceed, setIsSaveSucceed] = useState(false);

  const [error, setError] = useState<string | unknown>();

  const [fields, setFields] = useState<Map<number, FormFieldMetadata[]>>(
    new Map()
  );

  useEffect(() => {
    const getOptionalFormFormat = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get("/form/optional");
        const payload = await response.data;
        const dataMap = payload.data;

        // cast response to Map<number, FormFieldMetadata[]>
        const optionalFormFormat = new Map<number, FormFieldMetadata[]>();
        for (const key in dataMap) {
          optionalFormFormat.set(
            Number(key),
            dataMap[key] as FormFieldMetadata[]
          );
        }

        setFields(optionalFormFormat);
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
        ...Object.fromEntries(fields),
      };
      const response = await axiosClient.put("/form/optional", requestBody);
      const statusCode = response.status;
      if (statusCode === 200) {
        setIsSaveSucceed(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addFieldOnNewRow = (field: FormFieldMetadata) => {
    setFields((prev) => {
      const newMap = new Map(prev);
      newMap.set(prev.size, [field]);
      return newMap;
    });
  };

  const addFieldOnExistingRow = (
    field: FormFieldMetadata,
    rowIdx: number,
    dropPosition: DropPositionType
  ) => {
    setFields((prev) => {
      if (dropPosition === DropPositionType.LEFT) {
        prev.get(rowIdx)?.unshift(field);
      } else if (dropPosition === DropPositionType.RIGHT) {
        prev.get(rowIdx)?.push(field);
      }
      return new Map(prev);
    });
  };

  return {
    fields,
    isLoading,
    error,
    isSaveSucceed,
    addFieldOnNewRow,
    addFieldOnExistingRow,
    saveFormOptionalFormat,
  };
};

export default useFormSetting;
