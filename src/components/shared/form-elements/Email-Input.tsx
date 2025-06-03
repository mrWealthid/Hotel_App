import React from "react";
import Label from "./Label";
import ErrorMessage from "./Error";

const EmailInput = ({ label, name, style, children, error }: IEmailInput) => {
  return (
    <div className="w-full">
      {label && <Label name={name} text={label} />}
      {children || (
        <input
          type="email"
          required
          name={name}
          className={`input-style  ${style}`}
          placeholder={"Enter your email"}
        />
      )}
      {error && <ErrorMessage errorMsg={error} />}
    </div>
  );
};

interface IEmailInput {
  label?: string;
  name: string;
  error?: string;
  children?: React.ReactNode;
  style?: string;
}

export default EmailInput;
