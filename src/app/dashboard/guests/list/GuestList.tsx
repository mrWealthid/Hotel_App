'use client';
import Table from '@/components/Table/Table';
import { Icolumn } from '@/components/Table/models/table.model';
import GuestRow from './GuestRow';
import { fetchGuests } from '../service/guests.service';

import GuestHeaderActions from './GuestHeaderActions';

const GuestList = () => {
	const columns: Icolumn[] = [
		{ header: 'name', accessor: 'name', searchType: 'TEXT' },
		{ header: 'email', accessor: 'email' },
		{
			header: 'nationality',
			accessor: 'nationality'
		}
	];

	return (
		<div className="h-80">
			<Table
				service={fetchGuests}
				queryKey="Guests"
				headerActions={<GuestHeaderActions />}
				columns={columns}>
				<Table.TableHeader />
				<Table.TableRow customRow={true}>
					<GuestRow />
				</Table.TableRow>
			</Table>
		</div>
	);
};

export default GuestList;
