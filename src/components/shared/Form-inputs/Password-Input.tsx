import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Label from './Label';

const PasswordInput = ({
	label,
	placeholder,
	type = 'text',
	name,
	style,
	error,
	children
}: IPassword) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};
	return (
		// <div className="bg-white rounded-lg overflow-hidden  w-full my-2 border flex items-center">
		// 	<input
		// 		type={showPassword ? 'text' : 'password'}
		// 		placeholder="Enter Password"
		// 		name="password"
		// 		className=" py-4 pl-4 w-11/12 text-sm focus:ring-0 border-none "
		// 		value={control}
		// 		onChange={changeHandler}
		// 	/>

		// 	{!showPassword ? (
		// 		<FaEyeSlash
		// 			className="text-green-600 cursor-pointer"
		// 			onClick={togglePassword}
		// 		/>
		// 	) : (
		// 		<FaEye
		// 			className="text-green-600 cursor-pointer"
		// 			onClick={togglePassword}
		// 		/>
		// 	)}
		// </div>
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
			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
};

PasswordInput.propTypes = {
	control: PropTypes.string,
	changeHandler: PropTypes.func
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
