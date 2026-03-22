import { useState, type FC } from "react";

interface InputProps {
  name: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
}

const Input: FC<InputProps> = ({ name, value, setValue, min, max }) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      setInputValue("");
      return;
    }

    const cleaned = raw.replace(/^0+(?=\d)/, "");

    let num = Number(cleaned);

    if (min !== undefined) num = Math.max(num, min);
    if (max !== undefined) num = Math.min(num, max);

    setInputValue(num.toString());
    setValue(num);
  };

  const handleBlur = () => {
    if (inputValue === "" && min !== undefined) {
      setInputValue(min.toString());
      setValue(min);
    }
  };

  return (
    <label>
      <span>{name}:</span>
      <input
        type="number"
        style={{ minWidth: "150px", marginLeft: "10px" }}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </label>
  );
};

export default Input;
