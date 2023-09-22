import React, { useState } from 'react';
import CabinList from './CabinList';

import ButtonComponent from '@/components/shared/Button-component';
import CabinForm from './CabinForm';

const Page = () => {
	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				<h1 className="title"> All Cabins </h1>
			</div>

			<CabinForm />
			<CabinList />
		</div>
	);
};

export default Page;
