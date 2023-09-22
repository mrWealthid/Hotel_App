import { getData } from '@/utils/apiRequests';
import axios from 'axios';
import Table2 from './Table2';
import Table from '@/components/Table/Table';
import { data } from 'autoprefixer';
import TableRow from '@/components/Table/TableRow';

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

	const tableData: any = [
		{
			id: 1,
			name: 'Hotel2',
			email: 'johndoe@gmail.com',
			contact: '1234567890',
			RegDate: '2020-01-01',
			lastLogin: '2020-01-01',
			status: 'Active'
		},
		{
			id: 2,
			name: 'Hotel2',
			email: 'johndoe@gmail.com',
			contact: '1234567890',
			RegDate: '2020-01-01',
			lastLogin: '2020-01-01',
			status: 'Active'
		},
		{
			id: 3,
			name: 'Hotel2',
			email: 'johndoe@gmail.com',
			contact: '1234567890',
			RegDate: '2020-01-01',
			lastLogin: '2020-01-01',
			status: 'Active'
		},
		{
			id: 4,
			name: 'Hotel4',
			email: 'johndoe@gmail.com',
			contact: '1234567890',
			RegDate: '2020-01-01',
			lastLogin: '2020-01-01',
			status: 'Active'
		}
	];
	return (
		<div>
			<Table
				columns={columns}
				config={{ actionable: true }}
				data={cabins.data}>
				{cabins.data.map((data: any) => (
					<TableRow
						key={data.id}
						columns={columns}
						tableData={data}
					/>
				))}
			</Table>
		</div>
	);
};

export default CabinList;
