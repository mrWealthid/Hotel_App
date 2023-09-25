import { getData } from '@/utils/apiRequests';
import axios from 'axios';
import Table2 from '../Table2';
import Table from '@/components/Table/Table';

import TableRow from '@/components/Table/TableRow';
import Link from 'next/link';
import CabinRowActions from './CabinRowActions';

// async function fetchUser() {
// 	const res = await axios('/api/users');

// 	console.log(res.data);
// 	return res.data;
// }

const CabinList = async () => {
	const cabins = await getData('/api/cabins');

	const columns = [
		{ header: 'image', accessor: 'image' },
		{ header: 'name', accessor: 'name' },
		{ header: 'capacity', accessor: 'maxCapacity' },
		{ header: 'price', accessor: 'regularPrice' },
		{ header: 'discount', accessor: 'discount' }
	];

	return (
		<Table
			columns={columns}
			config={{ actionable: true }}
			data={cabins.data}>
			{cabins.data.map((data: any) => (
				<TableRow
					key={data.id}
					columns={columns}
					shouldDelete={true}
					tableData={data}>
					<CabinRowActions rowData={data} />
				</TableRow>
			))}
		</Table>
	);
};

export default CabinList;

{
	/* <Table
	columns={columns}
	config={{ actionable: true }}
	data={cabins.data}
	render={({ data } = cabins) => (
		<TableRow
			key={data?.id}
			columns={columns}
			shouldDelete={true}
			tableData={data}>
			<CabinRowActions rowData={data} />
		</TableRow>
	)}
/>; */
}
