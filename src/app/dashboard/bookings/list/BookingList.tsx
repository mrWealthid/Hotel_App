'use client';

// import Table from '@/components/Table/Table';
import Table from '@/components/Table2/Table';

import BookingHeaderActions from './BookingsHeaderActions';
import { Icolumn } from '@/components/Table/Table';

import BookingRow from './BookingRow';
import { fetchBookings } from '../service/bookings.service';

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
		<div className="h-80">
			<Table
				service={fetchBookings}
				queryKey="bookings"
				headerActions={<BookingHeaderActions />}
				url={'/api/bookings'}
				columns={columns}>
				<Table.TableHeader />
				<Table.TableRow customRow={true}>
					<BookingRow />
				</Table.TableRow>
			</Table>
		</div>
	);
};

export default BookingsList;
