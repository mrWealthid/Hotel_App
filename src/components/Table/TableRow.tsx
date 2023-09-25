'use client';

import React, { use, useState } from 'react';
import { Icolumn } from './Table';
import CabinForm from '@/app/dashboard/cabins/CabinForm';
import Link from 'next/link';

const TableRow = ({
	tableData,
	columns,
	children
}: any) => {
	return (
		<tbody>
			<tr className="bg-white relative border-b hover:bg-gray-50 ">
				<td className="p-2 font-medium md:px-2 md:py-4 whitespace-nowrap">
					<input
						title="check"
						id="checkbox-all-search"
						type="checkbox"
						className="w-4 h-4 m-0 border-gray-300 rounded focus:ring-gray-500 "
					/>
					<label
						htmlFor="checkbox-all-search text-sm"
						className="sr-only">
						#
					</label>
				</td>

				{columns.map((column: Icolumn) => (
					<td key={column.accessor as string}>
						{tableData[column.accessor]}
					</td>
				))}

				{/* This allows for content projection for row data- reusability */}
				{children}
			</tr>
		</tbody>
	);
};

export default TableRow;
