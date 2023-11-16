'use client';
import { Icolumn } from '@/components/Table/models/table.model';
import Table from '@/components/Table/Table';
import React from 'react';
import { fetchUsers } from '../service/user.service';
import UserRowAction from './UserRowAction';
import UserHeaderActions from './UserHeaderActions';

const UserList = () => {
	const columns: Icolumn[] = [
		// { header: 'image', accessor: 'image' },
		{ header: 'name', accessor: 'name', searchType: 'TEXT' },
		{ header: 'email', accessor: 'email' },
		{
			header: 'role',
			accessor: 'role',
			custom: { type: 'style' }
		}
	];

	return (
		<Table
			headerActions={<UserHeaderActions />}
			service={fetchUsers}
			actionable={false}
			queryKey="users"
			columns={columns}>
			<Table.TableHeader />
			<Table.TableRow>
				<UserRowAction />
			</Table.TableRow>
		</Table>
	);
};

export default UserList;
