import React from 'react';

const EmailInput = ({ label, name, style }: IEmailInput) => {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-xs">
					<span className="text-gray-700">{label}</span>
				</label>
			)}

			<input
				type="email"
				required
				name={name}
				className={`input-style ${style}`}
				placeholder="Enter Email"
			/>
		</div>
	);
};

interface IEmailInput {
	label?: string;
	name: string;

	style?: string;
}

export default EmailInput;
