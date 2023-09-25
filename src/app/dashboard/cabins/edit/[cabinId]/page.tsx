import { useParams } from 'next/navigation';
import React from 'react';
import CabinForm from '../../CabinForm';
import { findData } from '@/utils/apiRequests';

const page = async ({ params }: any) => {
	const cabins = await findData('/api/cabins', params.cabinId);

	return (
		<div>
			{params.cabinId}

			<CabinForm cabin={cabins.data} />
		</div>
	);
};

export default page;
