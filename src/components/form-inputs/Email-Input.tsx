import React from 'react';

const EmailInput = ({ label, name, style, children, error }: IEmailInput) => {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-xs">
					<span className="text-gray-700">{label}</span>
				</label>
			)}

			{children || (
				<input
					type="email"
					required
					name={name}
					className={`input-style  ${style}`}
					placeholder={'Enter your email'}
				/>
			)}

			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
};

interface IEmailInput {
	label?: string;
	name: string;
	error?: string;
	children: React.ReactNode;
	style?: string;
}

export default EmailInput;
