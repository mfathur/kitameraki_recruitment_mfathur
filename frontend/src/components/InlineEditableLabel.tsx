import { Label } from "@fluentui/react-components";
import { useId, useState } from "react";

type Props = {
  initialLabel: string;
  changeAble: boolean;
  onBlur: (newLabel: string) => void;
};

const InlineEditableLabel = ({ initialLabel, changeAble, onBlur }: Props) => {
  const id = useId();
  const [isLabelOnEdit, setIsLabelOnEdit] = useState(false);
  const [label, setLabel] = useState<string>(initialLabel);

  return (
    <>
      <Label
        htmlFor={id}
        onClick={() => {
          if (changeAble) setIsLabelOnEdit(true);
        }}
        className={`${isLabelOnEdit ? "hidden" : "block "}  ${
          changeAble ? "hover:cursor-pointer" : ""
        }`}
      >
        {label}
      </Label>
      <input
        type="text"
        id={id}
        className={`${isLabelOnEdit ? "block" : "hidden"} focus:outline-0`}
        onBlur={() => {
          setIsLabelOnEdit(false);
          onBlur(label);
        }}
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
        }}
      />
    </>
  );
};

export default InlineEditableLabel;
