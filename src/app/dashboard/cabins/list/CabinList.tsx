'use client';

import { getData } from '@/utils/apiRequests';
import axios from 'axios';

// import Table from '@/components/Table/Table';
import Table from '@/components/Table2/Table';

import TableRow from '@/components/Table/TableRow';
import Link from 'next/link';
import CabinRowActions from './CabinRowActions';
import HeaderActions from '@/components/Table/HeaderActions';
import CabinHeaderActions from './CabinHeaderActions';
import { Icolumn } from '@/components/Table2/models/table.model';

import { useCabins } from '../hooks/useCabins';
import { fetchCabins } from '../service/cabins.service';

// async function fetchUser() {
// 	const res = await axios('/api/users');

// 	console.log(res.data);
// 	return res.data;
// }

const CabinList = () => {
	// const cabins = await getData('/api/cabins', 'cabins', 'no-discount');

	const columns: Icolumn[] = [
		{ header: 'image', accessor: 'image' },
		{ header: 'name', accessor: 'name', searchType: 'TEXT' },
		{ header: 'capacity', accessor: 'maxCapacity', searchType: 'NUMBER' },
		{
			header: 'price',
			accessor: 'regularPrice',
			custom: { type: 'currency' },
			searchType: 'NUMBER'
		},
		{
			header: 'discount',
			accessor: 'discount',
			custom: { type: 'percent' },
			searchType: 'NUMBER'
		}
	];

	return (
		<Table
			service={fetchCabins}
			queryKey="cabins"
			headerActions={<CabinHeaderActions />}
			columns={columns}>
			<Table.TableHeader />
			<Table.TableRow>
				<CabinRowActions />
			</Table.TableRow>
		</Table>
	);
};

export default CabinList;
