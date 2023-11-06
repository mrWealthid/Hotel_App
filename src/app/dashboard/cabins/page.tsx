import React from 'react';
import CabinList from './list/CabinList';

import AddCabin from './AddCabin';

const Page = () => {
	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<h1 className="title"> All Cabins </h1>

				<AddCabin />
			</div>

			<CabinList />
		</div>
	);
};

export default Page;
