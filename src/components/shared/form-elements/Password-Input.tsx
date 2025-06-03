import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";
import Label from "./Label";
import ErrorMessage from "./Error";

const PasswordInput = ({
  label,
  placeholder,
  type = "text",
  name,
  style,
  error,
  children,
}: IPassword) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full">
      {label && <Label name={name} text={label} />}
      <div className="flex items-center">
        {children || (
          <input
            type={type}
            required
            name={name}
            className={`input-style  ${style}`}
            placeholder={placeholder}
          />
        )}
        {!showPassword ? (
          <FaEyeSlash
            className="text-green-600 cursor-pointer"
            onClick={togglePassword}
          />
        ) : (
          <FaEye
            className="text-green-600 cursor-pointer"
            onClick={togglePassword}
          />
        )}
      </div>
      {error && <ErrorMessage errorMsg={error} />}
    </div>
  );
};

PasswordInput.propTypes = {
  control: PropTypes.string,
  changeHandler: PropTypes.func,
};

interface IPassword {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  style?: string;
  error?: string;
  children?: React.ReactNode;
  control: string;
  changeHandler: Function;
}
export default PasswordInput;
