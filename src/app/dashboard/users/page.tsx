import React from 'react';
import UserList from './list/UserList';

const page = () => {
	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				<h1 className="title"> All Users </h1>
			</div>

			<UserList />
		</div>
	);
};

export default page;
