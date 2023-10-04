'use client';

import { getData } from '@/utils/apiRequests';
import axios from 'axios';

// import Table from '@/components/Table/Table';
import Table from '@/components/Table2/Table';

import TableRow from '@/components/Table/TableRow';
import Link from 'next/link';
import CabinRowActions from './BookingsRowActions';
import HeaderActions from '@/components/Table/HeaderActions';
import CabinHeaderActions from './BookingsHeaderActions';
import { Icolumn } from '@/components/Table/Table';

// async function fetchUser() {
// 	const res = await axios('/api/users');

// 	console.log(res.data);
// 	return res.data;
// }

const BookingsList = () => {
	// const cabins = await getData('/api/cabins', 'cabins', 'no-discount');

	const columns: Icolumn[] = [
		{ header: 'cabin', accessor: 'cabin' },
		{ header: 'guest', accessor: 'guests.email' },
		{ header: 'amount', accessor: 'totalPrice' },
		{ header: 'status', accessor: 'checkStatus' },
		{ header: 'start date', accessor: 'startDate' },
		{ header: 'end Date', accessor: 'endDate' }
	];

	return (
		<Table
			headerActions={<CabinHeaderActions />}
			url={'/api/bookings'}
			columns={columns}>
			<Table.TableHeader />
			<Table.TableRow>
				<CabinRowActions />
			</Table.TableRow>
		</Table>
	);
};

export default BookingsList;
