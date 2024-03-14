import { Bs123 } from "react-icons/bs";
import { BsCalendar2Event } from "react-icons/bs";
import { FiSliders } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";

import ItemFormComponent from "../components/ItemFormComponent";

import { Field, Input } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const navigate = useNavigate();
  return (
    <main className="flex min-h-screen">
      <div className="bg-gray-200 border-1 border-gray-700 min-w-64">
        <h3 className="font-bold text-lg p-2">Component</h3>
        <hr className="bg-gray-400 h-px border-0 mb-4" />

        <div className="flex gap-4 flex-wrap justify-center px-4">
          <ItemFormComponent name="TextField" Icon={Bs123} />
          <ItemFormComponent name="DatePicker" Icon={BsCalendar2Event} />
          <ItemFormComponent name="SpinButton" Icon={FiSliders} />
        </div>
      </div>
      <div className="py-10 px-20 flex flex-col">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="rounded-full btn-outlined w-40 px-4 py-2 justify-center items-center flex mb-8 gap-x-2"
        >
          <FaArrowLeft />
          Back To Home
        </button>
        <h1 className="text-3xl font-bold">Form Setting</h1>
        <p className="font-bold mt-4">Standar Fields</p>
        <div className="flex flex-col gap-3 py-2">
          <Field label="Title">
            <Input disabled />
          </Field>
          <Field label="Description">
            <Input disabled />
          </Field>
        </div>

        <p className="font-bold mt-4">Optional Fields</p>
        <p className="mt-5 text-gray-400">Still under development</p>
      </div>
    </main>
  );
};

export default SettingPage;
