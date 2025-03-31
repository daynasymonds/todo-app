import { useState } from "react";
import Image from "next/image";

interface CheckboxProps {
  id: string;
  className: string;
  isChecked: boolean;
  onChange: () => void;
}

export default function Checkbox({ ...props }: CheckboxProps) {
  const defaultChecked = props.isChecked;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <div
      className={props.className}
      role="checkbox"
      aria-checked={props.isChecked}
      tabIndex="0"
      onClick={() => {
        setIsChecked(!isChecked);
        props.onChange();
      }}
    >
      {props.isChecked ? (
        <Image
          src="./checked.svg"
          width="18"
          height="18"
          alt="Checked checkbox for item"
        />
      ) : (
        <Image
          src="./unchecked.svg"
          width="18"
          height="18"
          alt="Unchecked checkbox for item"
        />
      )}
    </div>
  );
}
