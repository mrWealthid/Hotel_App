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

// async function fetchUser() {
// 	const res = await axios('/api/users');

// 	console.log(res.data);
// 	return res.data;
// }

const CabinList = () => {
	// const cabins = await getData('/api/cabins', 'cabins', 'no-discount');

	const columns = [
		{ header: 'image', accessor: 'image' },
		{ header: 'name', accessor: 'name' },
		{ header: 'capacity', accessor: 'maxCapacity' },
		{ header: 'price', accessor: 'regularPrice' },
		{ header: 'discount', accessor: 'discount' }
	];

	return (
		<Table
			headerActions={<CabinHeaderActions />}
			url={'/api/cabins'}
			columns={columns}>
			<Table.TableHeader />
			<Table.TableRow>
				<CabinRowActions />
			</Table.TableRow>
		</Table>
	);
};

export default CabinList;
