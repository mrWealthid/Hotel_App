import React from 'react';

const TableRow = ({ tableData }: any) => {
	function Table({
		id,
		name,
		email,
		contact,
		RegDate,
		lastLogin,
		status
	}: any) {
		return (
			<>
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
					<td className="p-2 font-medium md:px-2 md:py-4 whitespace-nowrap">
						{name}
					</td>
					<td className="p-2  md:px-2 md:py-4">{email}</td>
					<td className="p-2 md:px-2 md:py-4">{contact}</td>
					<td className="p-2 md:px-2 md:py-4">{RegDate}</td>
					<td className="p-2 md:px-2 md:py-4">{lastLogin}</td>
					<td className="p-2 md:px-2 md:py-4 ">
						<button className="px-4 py-1 text-green-700 bg-green-100 rounded">
							{status}
						</button>
					</td>
					<td className="p-2 md:px-2 md:py-4">
						<button className="text-xl popup">...</button>
					</td>
				</tr>
			</>
		);
	}
	return (
		<tbody>
			{tableData.map((item: any, index: number) => (
				<Table {...item} key={index} />
			))}
		</tbody>
	);
};

export default TableRow;
