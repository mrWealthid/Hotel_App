'use client';
import Table from '@/components/Table/Table';
import BookingHeaderActions from './BookingsHeaderActions';
import { Icolumn } from '@/components/Table/models/table.model';
import BookingRow from './BookingRow';
import { fetchBookings } from '../service/bookings.service';

const BookingsList = () => {
	// const cabins = await getData('/api/cabins', 'cabins', 'no-discount');

	const columns: Icolumn[] = [
		{ header: 'cabin', accessor: 'cabin.name', searchType: 'TEXT' },
		{
			header: 'guest',
			accessor: 'guests.name',
			searchType: 'TEXT'
		},
		{ header: 'amount', accessor: 'totalPrice', searchType: 'NUMBER' },
		{
			header: 'status',
			accessor: 'checkStatus',
			searchType: 'DROPDOWN'
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
