'use client';

import React, { Children, useState } from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import toast from 'react-hot-toast';

import HeaderActions from './HeaderActions';

const Table = ({
	columns,
	config,

	children,
	headerContent
}: ITableProps) => {
	function handleToast() {
		toast.success('I worked');
	}

	const [data, setData] = useState();

	function fetchTableData(url: any) {}

	return (
		<section>
			<HeaderActions>{headerContent}</HeaderActions>

			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 ">
					<TableHeader columns={columns} />

					{children}
				</table>
			</div>
		</section>
	);
};

interface ITableProps {
	columns: Icolumn[];
	config?: TableConfig;
	data: any[];
	children: React.ReactNode;
	headerContent?: any;
}

interface TableConfig {
	actionable?: boolean;
	checkable?: boolean;
}

export interface Icolumn {
	header: string;
	accessor: string;
	key?: string;
	custom?: {
		type: string;
		suffix?: string;
		prefix?: string;
		bolden?: boolean;
	};
}
export default Table;
