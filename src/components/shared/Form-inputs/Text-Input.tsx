import React from 'react';
import Label from './Label';

const TextInput = ({
	label,
	placeholder,
	type = 'text',
	name,
	style,
	error,
	children
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

			{error && <span className="text-sm text-red-500">{error}</span>}
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
