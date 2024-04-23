import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { object, string } from "yup";
import {
  Button,
  Field,
  Input,
  Label,
  Textarea,
} from "@fluentui/react-components";
import useFormSetting from "../hooks/useFormSetting";
import OptionalFieldsTrial from "./OptionalFieldsTrial";
import { useState } from "react";

type Props = {
  onBtnCloseClicked: () => void;
  onBtnCreateClicked: (task: Task) => void;
};

const CreateTaskModal = ({ onBtnCloseClicked, onBtnCreateClicked }: Props) => {
  const formik = useFormik({
    initialValues: { id: "", title: "", description: "" },
    validationSchema: object({
      title: string().required("Title is required"),
      description: string(),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values: Task) => {
      onBtnCreateClicked({
        id: "",
        title: values.title,
        description: values.description,
        optionals: {
          ...optionalFieldValues,
        },
      });
    },
  });

  const { optionalFields } = useFormSetting();
  const [optionalFieldValues, setOptionalFieldValues] = useState({});

  const handleOptionalValueChange = (fieldId: string, value: unknown) => {
    setOptionalFieldValues((prev) => {
      const val = { ...prev, [fieldId]: value };
      console.log(val);

      return val;
    });
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full h-full bg-black bg-opacity-60">
      <div className="relative p-4 w-full max-w-md max-h-full md:left-1/3 ">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-lg font-semibold">Create New Task</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onBtnCloseClicked}
            >
              <AiOutlineClose />
            </button>
          </div>
          <form
            className="p-4 md:p-5 flex flex-col"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <Label className="font-medium mb-1 block">Title</Label>
                <Input
                  id="title"
                  className="w-full"
                  placeholder="e.g: write an email"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                {formik.errors.title ? (
                  <p className="text-red-700 mt-1">{formik.errors.title}</p>
                ) : null}
              </div>
              <Field className="font-medium" label="Description">
                <Textarea
                  id="description"
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="write the description here"
                />
              </Field>
              <OptionalFieldsTrial
                onFieldValueChange={handleOptionalValueChange}
                fields={optionalFields}
                onDrop={(_field, _index, _dropPosition) => {}}
              />
            </div>

            <Button type="submit" appearance="primary">
              Add new task
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
