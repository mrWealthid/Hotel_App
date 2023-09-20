import { getData } from '@/utils/apiRequests';
import axios from 'axios';

// async function fetchUser() {
// 	const res = await axios('/api/users');

// 	console.log(res.data);
// 	return res.data;
// }

const CabinList = async () => {
	const cabins = await getData('/api/users');

	return (
		<div>
			<p>Test</p>
			{cabins.data.map((data: any) => (
				<p key={data.id}>{data.name}</p>
			))}
		</div>
	);
};

export default CabinList;
