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
import BookingsRowActions from './BookingsRowActions';
import BookingRow from './BookingRow';

// async function fetchUser() {
// 	const res = await axios('/api/users');

// 	console.log(res.data);
// 	return res.data;
// }

const BookingsList = () => {
	// const cabins = await getData('/api/cabins', 'cabins', 'no-discount');

	const columns: Icolumn[] = [
		{ header: 'cabin', accessor: 'cabin.name' },
		{
			header: 'guest',
			accessor: 'guests.name,guests.email',
			custom: { type: 'doubleCell' }
		},
		{ header: 'amount', accessor: 'totalPrice' },
		{
			header: 'status',
			accessor: 'checkStatus',
			custom: { type: 'style' }
		},

		{
			header: 'Dates',
			accessor: ''
		}
	];

	return (
		<Table
			headerActions={<CabinHeaderActions />}
			url={'/api/bookings'}
			columns={columns}>
			<Table.TableHeader />
			<Table.TableRow customRow={true}>
				<BookingRow />
			</Table.TableRow>
		</Table>
	);
};

export default BookingsList;
