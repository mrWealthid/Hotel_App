'use client';
import React, {
	ReactNode,
	cloneElement,
	useContext,
	useEffect,
	useState
} from 'react';
import { createContext } from 'react';
import { Icolumn } from '../Table/Table';

const TableContext = createContext({});

interface ITable {
	children: ReactNode;
	url: string;
	columns: Icolumn[];
	headerActions?: ReactNode;
}

function Table({ children, url, columns, headerActions }: ITable) {
	const [data, setData] = useState([]);

	async function fetchTableData() {
		const response = await fetch(url);

		const data = await response.json();

		setData(data.data);
	}
	useEffect(() => {
		fetchTableData();
	}, []);

	function updateStateData(data: any) {
		console.log('I was clicked');
		setData(data);
	}

	return (
		<TableContext.Provider
			value={{ data, updateStateData, columns, headerActions }}>
			<section>
				<div className="relative overflow-x-auto">
					<TableHeaderAction updateData={updateStateData}>
						{headerActions}
					</TableHeaderAction>

					<table className="w-full text-sm text-left text-gray-500 ">
						{children}
					</table>
				</div>
			</section>
		</TableContext.Provider>
	);
}

function TableHeader() {
	const { columns }: any = useContext(TableContext);
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
			</tr>
		</thead>
	);
}
export function TableHeaderAction({ children }: any) {
	const { updateStateData }: any = useContext(TableContext);
	return (
		<div className="flex flex-col flex-wrap items-center  justify-between mb-2 px-3 overflow-x-auto md:flex-row">
			<div className="flex items-center gap-3 mt-4">
				<div className="flex items-center">
					<input
						title="check"
						id="checkbox-all-search"
						type="checkbox"
						className="w-4 h-4 m-0 border-gray-300 rounded focus:ring-gray-500 "
					/>
					<label
						htmlFor="checkbox-all-search text-sm"
						className="sr-only">
						checkbox
					</label>
				</div>
				<div>
					<svg
						className="w-6 h-6 text-gray-300"
						fill="gray-200"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
					</svg>
				</div>
				<form>
					<label
						htmlFor="default-search"
						className="mb-2 text-xs font-medium text-gray-900 sr-only">
						Search
					</label>
					<input
						type="search"
						id="default-search"
						className="bg-gray-100  text-sm rounded-lg border border-none focus-within:ring-0 htmlForm-control"
						placeholder="Search"
						required
					/>
				</form>
			</div>

			<div className="flex flex-wrap items-center gap-3 mt-2 md:gap-6">
				{cloneElement(children, { updateStateData })}

				<div className="">
					<button
						type="button"
						className="w-full  text-xs px-6 py-2 rounded  bg-gray-50 font-light text-black border btn">
						Export As
					</button>
				</div>

				<div className="flex gap-3 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						fill=" #ff931f">
						<path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z" />
					</svg>
					<p className="text-sm w-11">Print</p>
				</div>
			</div>
		</div>
	);
}
function TableRow({ children }: any) {
	const { columns, data }: any = useContext(TableContext);
	return (
		<tbody>
			{data.map((row: any, i: any) => {
				return (
					<tr
						key={i}
						className="bg-white relative border-b hover:bg-gray-50 ">
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

						{/* Updated this flow because of nested data type in row data */}
						{columns.map((column: Icolumn, i: any) => {
							console.log(column.accessor);
							const value = column.accessor
								?.split('.')
								.reduce((obj, key) => obj[key], row);
							return <td key={column.accessor + i}>{value}</td>;
						})}

						{cloneElement(children, { rowData: row })}
					</tr>
				);
			})}
		</tbody>
	);
}

Table.TableHeader = TableHeader;
Table.TableRow = TableRow;

export default Table;
