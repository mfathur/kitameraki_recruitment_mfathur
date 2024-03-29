import { Field, Input } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Bs123 } from "react-icons/bs";
import { BsCalendar2Event } from "react-icons/bs";
import { FiSliders } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";

import ItemFormComponent from "../components/ItemFormComponent";
import OptionalFields from "../components/OptionalFields";
import DroppableZone from "../components/DroppableZone";

import { FORM_TYPES } from "../utils/constants";

const SettingPage = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState<FormFieldMetadata[]>([]);

  return (
    <main className="flex min-h-screen ">
      <div className="bg-gray-200 border-1 border-gray-700 min-w-80">
        <h3 className="font-bold text-lg p-2">Component</h3>
        <hr className="bg-gray-400 h-px border-0 mb-4" />

        <div className="flex gap-4 flex-wrap justify-center px-2">
          <ItemFormComponent
            type={FORM_TYPES.TEXT}
            name="TextField"
            Icon={Bs123}
          />
          <ItemFormComponent
            type={FORM_TYPES.DATE}
            name="DatePicker"
            Icon={BsCalendar2Event}
          />
          <ItemFormComponent
            type={FORM_TYPES.SPIN}
            name="SpinButton"
            Icon={FiSliders}
          />
        </div>
      </div>
      <div className="py-10 px-20 flex flex-col w-full">
        <div className="mb-8 flex justify-between">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="rounded-full btn-outlined w-40 px-4 py-2 justify-center items-center flex gap-x-2"
          >
            <FaArrowLeft />
            Back To Home
          </button>
          {fields.length > 0 ? (
            <button className="btn-contained rounded-full px-4 py-2 w-20">
              Save
            </button>
          ) : null}
        </div>

        <h1 className="text-3xl font-bold">Form Setting</h1>
        <p className="font-bold mt-4">Standard Fields</p>
        <div className="flex flex-col gap-3 py-2">
          <Field label="Title">
            <Input disabled />
          </Field>
          <Field label="Description">
            <Input disabled />
          </Field>
        </div>

        <p className="font-bold my-4">Optional Fields</p>

        {fields.length === 0 && (
          <DroppableZone
            className="min-h-60"
            onDrop={(field: FormFieldMetadata) => {
              setFields((prev) => [...prev, field]);
            }}
          />
        )}

        <div className="relative w-full min-h-16 ">
          <OptionalFields
            onDrop={(field: FormFieldMetadata) => {
              setFields((prev) => [...prev, field]);
            }}
            fields={fields}
          />
        </div>

        {fields.length > 0 ? (
          <DroppableZone
            onDrop={(field: FormFieldMetadata) => {
              setFields((prev) => [...prev, field]);
            }}
            className="mt-4"
          />
        ) : null}
      </div>
    </main>
  );
};

export default SettingPage;
