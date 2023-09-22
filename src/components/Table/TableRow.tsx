import React from 'react';
import { Icolumn } from './Table';

const TableRow = ({ tableData, columns }: any) => {
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

				<td className="p-2 md:px-2 md:py-4">
					<button className="text-xl popup">...</button>
				</td>
			</tr>
		</tbody>
	);
};

export default TableRow;
