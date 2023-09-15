import React from 'react';

const TextInput = ({
	label,
	placeholder,
	type = 'text',
	name,
	style
}: ITextInput) => {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-xs">
					<span className="text-gray-700">{label}</span>
				</label>
			)}

			<input
				type={type}
				required
				name={name}
				className={`input-style ${style}`}
				placeholder={placeholder}
			/>
		</div>
	);
};

interface ITextInput {
	label?: string;
	name: string;
	placeholder: string;
	type?: string;
	style?: string;
}

export default TextInput;
