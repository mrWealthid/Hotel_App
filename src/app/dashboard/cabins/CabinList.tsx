import { getData } from '@/utils/apiRequests';
import axios from 'axios';
import Table2 from './Table2';
import Table from '@/components/Table/Table';
import { data } from 'autoprefixer';

// async function fetchUser() {
// 	const res = await axios('/api/users');

// 	console.log(res.data);
// 	return res.data;
// }

const CabinList = async () => {
	const cabins = await getData('/api/users');

	const columns = ['image', 'cabin', 'capacity', 'price', 'discount'];

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
			<p>Test</p>
			{/* {cabins.data.map((data: any) => (
				<p key={data.id}>{data.name}</p>
			))} */}
			<Table
				columns={columns}
				config={{ actionable: true }}
				data={tableData}
			/>
		</div>
	);
};

export default CabinList;
