import React from 'react';

const StatComponent = ({ title, value, color, icon }: any) => {
	return (
		<div className=" card rounded-md w-full h-20 p-2 pl-4 shadow-md flex items-center gap-3">
			<span className={`bg-gray-200 rounded-full p-2`}>{icon}</span>
			<div className="flex-grow flex flex-col-reverse">
				<p className="font-bold text-md pr-6">{value}</p>
				<span className="text-xs capitalize font-normal">{title}</span>
			</div>
		</div>
	);
};

export default StatComponent;
