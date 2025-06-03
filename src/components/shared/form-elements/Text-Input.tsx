import React from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

const TextInput = ({
  label,
  placeholder,
  type = "text",
  name,
  style,
  error,
  children,
}: ITextInput) => {
  return (
    <div className="w-full">
      {label && <Label name={name} text={label} />}

      {children || (
        <input
          type={type}
          required
          name={name}
          className={`input-style  ${style}`}
          placeholder={placeholder}
        />
      )}

      {error && <ErrorMessage errorMsg={error} />}
    </div>
  );
};

interface ITextInput {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  style?: string;
  error?: string;
  children?: React.ReactNode;
}

// interface IFormErrors {}

export default TextInput;
