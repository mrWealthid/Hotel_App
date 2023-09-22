import React from 'react';
import { Icolumn } from './Table';

const TableHeader = ({ columns }: any) => {
	return (
		<thead className="text-xs wheat-light text-gray-700 uppercase ">
			<tr>
				<th scope="col" className="px-2 py-4 uppercase">
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
				</th>

				{columns.map((col: Icolumn) => (
					<th key={col.header} scope="col" className="py-4 uppercase">
						{col.header}
					</th>
				))}

				{/* <th scope="col" className="px-2 py-4 uppercase">
					Email
				</th>
				<th scope="col" className="px-2 py-4 uppercase">
					contact
				</th>
				<th scope="col" className="px-2 py-4 uppercase">
					Sign up date
				</th>
				<th scope="col" className="px-2 py-4 uppercase">
					Last Signed in
				</th>
				<th scope="col" className="px-2 py-4 uppercase">
					Status
				</th>
				<th scope="col" className="px-2 py-4 uppercase">
					Action
				</th> */}
			</tr>
		</thead>
	);
};

export default TableHeader;
