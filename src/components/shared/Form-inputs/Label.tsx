import React from 'react';

const Label = ({ name, text }: { name: string; text: string }) => {
	return (
		<label htmlFor={name} className="block cursor-pointer text-xs">
			<span className="text-gray-700 capitalize">{text}</span>
		</label>
	);
};

export default Label;
