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
	limit?: number;
}

function Table({
	children,
	url,
	columns,
	headerActions,
	limit: limitVal = 10
}: ITable) {
	const [data, setData] = useState([]);
	const [totalRecords, SetTotalRecords] = useState(0);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(limitVal);

	async function fetchTableData(page: number, limit: number) {
		const response = await fetch(`${url}?limit=${limit}&page=${page}`);

		const data = await response.json();

		console.log(data.data.length);
		SetTotalRecords(data.totalRecords);

		setData(data.data);
	}
	useEffect(() => {
		fetchTableData(page, limit);
	}, []);

	function updateStateData(data: any) {
		setData(data);
	}

	function handlePaginate(val: number, limit: number) {
		setPage(val);
		setLimit(limit);
		fetchTableData(val, limit);
	}

	return (
		<TableContext.Provider
			value={{ data, updateStateData, columns, headerActions }}>
			<div className=" overflow-x-auto  bg-white p-2">
				<TableHeaderAction updateData={updateStateData}>
					{headerActions}
				</TableHeaderAction>

				<table className="w-full text-sm text-left text-gray-500 ">
					{children}
				</table>

				<div className="mt-3 text-xs">
					<Paginator
						totalRecords={totalRecords}
						data={data}
						limit={limit}
						page={page}
						handlePaginate={handlePaginate}
					/>
				</div>
			</div>
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
			<div className="flex items-center gap-2 mt-4">
				{/* <div>
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
				</div> */}
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

			<div className="flex flex-wrap items-center gap-3 mt-2 md:gap-2">
				{cloneElement(children, { updateStateData })}

				{/* <div className="">
					<button
						type="button"
						className="w-full  text-xs px-6 py-2 rounded  bg-gray-50 font-light text-black border btn">
						Export As
					</button>
				</div> */}

				{/* <div className="flex gap-3 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						fill=" #ff931f">
						<path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z" />
					</svg>
					<p className="text-sm w-11">Print</p>
				</div> */}
			</div>
		</div>
	);
}
function TableRow({ children, customRow }: any) {
	const { columns, data }: any = useContext(TableContext);
	return (
		<tbody>
			{!customRow
				? data.map((row: any, i: any) => {
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

								{columns.map((column: Icolumn, i: any) => {
									//This logic helps check for more accessors; double items in a row cell
									const value = column.accessor
										.split(',')
										.map((val) =>
											val
												?.split('.')
												.reduce(
													(obj, key) => obj[key],
													row
												)
										);

									if (column.custom) {
										if (
											column.custom.type === 'doubleCell'
										) {
											return (
												<td
													className={`${
														column.custom.bolden &&
														'font-semibold'
													}`}
													key={column.accessor + i}>
													{value.map(
														(
															val: any,
															ind: any
														) => (
															<span
																key={ind}
																className={`${
																	ind === 0
																		? 'text-sm font-semibold'
																		: 'text-xs'
																}  block  mb-1  rounded-3xl`}>
																{val}
															</span>
														)
													)}
												</td>
											);
										}
										if (column.custom.type === 'style') {
											return (
												<td
													className={`${
														column.custom.bolden &&
														'font-semibold'
													}`}
													key={column.accessor + i}>
													<span className="bg-green-400 text-xs text-white py-2 px-3 rounded-3xl inline-flex">
														{value}
													</span>
												</td>
											);
										}
										if (column.custom.type === 'date') {
											return (
												<td
													className={`${
														column.custom.bolden &&
														'font-semibold'
													}`}
													key={column.accessor + i}>
													{new Date(
														value[0]
													).toDateString()}
												</td>
											);
										}
										if (column.custom.type === 'sentence') {
											return (
												<td
													className={`${
														column.custom.bolden &&
														'font-semibold'
													} `}
													key={column.accessor + i}>
													{value} {''}{' '}
													{column.custom.suffix}
												</td>
											);
										}
									}
									return (
										<td key={column.accessor + i}>
											{value}
										</td>
									);
								})}

								{cloneElement(children, { rowData: row })}
							</tr>
						);
				  })
				: cloneElement(children, { data })}
		</tbody>
	);
}

function Paginator({ data, totalRecords, page, limit, handlePaginate }: any) {
	const [maxNumPage, setMaxNumPage] = useState(0);

	function CalcNumOfPages(data: number, limit: number) {
		return Math.ceil(data / limit);
	}

	useEffect(() => {
		setMaxNumPage(Math.ceil(totalRecords / limit));
	}, [totalRecords, limit]);

	function displayButtons() {
		let val = CalcNumOfPages(totalRecords, limit);
		let newArray = Array.from({ length: val }, (value, index) => index + 1);
		return newArray;
	}

	return (
		<section className="flex justify-between items-center">
			<section className="flex-col flex  p-2 gap-1">
				<strong>Summary</strong>
				<p>
					{' '}
					Showing <span>1</span> to <span>{data.length}</span> of{' '}
					<span>{totalRecords}</span> results
				</p>
				<hr />
				<div>
					Total: {totalRecords} | Size: {limit} | Page: {page}
				</div>
			</section>
			<nav className="flex gap-3" aria-label="Page navigation example">
				<section className="flex items-center gap-1">
					<span>Rows Per Page</span>
					<select
						onChange={(e) => handlePaginate(page, e.target.value)}
						value={limit}
						id="sort"
						name="sort"
						title="sortdropdown"
						className="text-xs font-light text-gray-900 focus-within:ring-0 focus-within:border-none border border-gray-300 bg-gray-50 rounded">
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={20}>20</option>
					</select>
				</section>

				<ul className="flex items-center gap-2 h-10 text-base">
					<li
						onClick={() => {
							page > 1 && handlePaginate(page - 1, limit);
						}}>
						<a
							className={`${
								page === 1 && 'cursor-not-allowed'
							} flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
							<span className="sr-only">Previous</span>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 1 1 5l4 4"
								/>
							</svg>
						</a>
					</li>
					{displayButtons()
						.slice(page - 1, page + 2)
						.map((val, index) => (
							<li
								onClick={() => handlePaginate(val, limit)}
								key={val}>
								<a
									className={`${
										val === page
											? 'bg-primary  text-white'
											: 'bg-white hover:bg-gray-100'
									} flex items-center  rounded-3xl justify-center px-4 h-10 leading-tight text-gray-500 cursor-pointer  border border-gray-300 `}>
									{val}
								</a>
							</li>
						))}

					<li>
						<a
							onClick={() => {
								maxNumPage > page &&
									handlePaginate(page + 1, limit);
							}}
							className={`${
								maxNumPage <= page ? 'cursor-not-allowed ' : ''
							} flex items-center  justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
							<span className="sr-only">Next</span>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
						</a>
					</li>
				</ul>
			</nav>
		</section>
	);
}

Table.TableHeader = TableHeader;
Table.TableRow = TableRow;

export default Table;
