'use client';
import React, { cloneElement, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { ITable, Icolumn } from './models/table.model';
import { formatCurrency } from '@/utils/helpers';
import { IListResponse } from '@/app/dashboard/cabins/hooks/useCabins';
import { useTable } from './hooks/useTable';
import Modal from '../shared/Modal/Modal-component';
import TextInput from '@/components/shared/Form-inputs/Text-Input';
import { useForm } from 'react-hook-form';
import ButtonComponent from '../shared/Form-inputs/Button';
import { FcEmptyFilter, FcFilledFilter } from 'react-icons/fc';

const TableContext = createContext({});

function Table({
	queryKey,
	children,
	columns,

	headerActions,
	service,
	limit: limitVal,
	actionable = true
}: ITable) {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(limitVal || 5);
	const [search, setSearch] = useState<string | null>(null);
	const [filterIsActive, setfilterIsActive] = useState(false);

	const { isLoading, error, data, totalRecords, results }: IListResponse =
		useTable(page, limit, service, queryKey, search);

	function handleFilter(val: { key: string; value: string | number } | null) {
		let transformedSearchQuery = '';
		if (!val) {
			setfilterIsActive(false);
			setSearch(null);
			return;
		}

		transformedSearchQuery = objectToQueryParams(val);

		setSearch(transformedSearchQuery);
		setPage(1);

		setfilterIsActive(true);
	}

	function cancelFilter() {
		setfilterIsActive(false);
		setSearch(null);
	}

	// const queryClient = useQueryClient();

	function handlePaginate(page: number, limit: number) {
		setPage(page);
		setLimit(limit);
	}

	function updateLimit(val: number) {
		setLimit(val);
	}
	function updatePage(val: number) {
		setPage(val);
	}

	function removeEmptyKeys(obj: { [key: string]: any }): {
		[key: string]: any;
	} {
		const cleanedObj: { [key: string]: any } = {};
		Object.keys(obj).forEach((key) => {
			if (
				obj[key] !== null &&
				obj[key] !== undefined &&
				obj[key] !== ''
			) {
				cleanedObj[key] = obj[key];
			}
		});
		return cleanedObj;
	}
	function objectToQueryParams(obj: { [key: string]: any }): string {
		return Object.keys(removeEmptyKeys(obj))
			.map(
				(key) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(
						obj[key].toString()
					)}`
			)
			.join('&');
	}

	return (
		<TableContext.Provider
			value={{
				data,
				columns,
				headerActions,
				service,
				limit,
				page,
				updateLimit,
				totalRecords,
				handlePaginate,
				handleFilter,
				objectToQueryParams,
				cancelFilter,
				filterIsActive,
				actionable
			}}>
			<div className=" overflow-x-auto   card p-2">
				<TableHeaderAction handleFilter={handleFilter}>
					{headerActions}
				</TableHeaderAction>

				<table className="w-full   text-sm  text-gray-500 ">
					{children}
				</table>

				<div className="mt-3 text-xs">
					<Paginator

					// handlePaginate={handlePaginate}
					/>
				</div>
			</div>
		</TableContext.Provider>
	);
}

function TableFilterForm({ column, onCloseModal }: any) {
	const { objectToQueryParams, handleFilter, cancelFilter }: any =
		useContext(TableContext);
	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'onChange'
	});
	const { errors, isSubmitting } = formState;

	const { columns }: any = useContext(TableContext);

	async function onSubmit(data: any, onCloseModal: any) {
		handleFilter(data);

		onCloseModal();
		// console.log(objectToQueryParams(data));
	}

	return (
		<form
			onSubmit={handleSubmit((data) => onSubmit(data, onCloseModal))}
			className=' flex flex-col gap-3 p-6  items-center"'>
			<section className=" grid gap-3 grid-cols-2 ">
				{columns.map((column: any) => {
					if (column.searchType === 'TEXT') {
						return (
							<TextInput
								key={column.accessor}
								name={column.header}
								label={column.header}
								error={errors?.[
									`${column.header}`
								]?.message?.toString()}>
								<input
									{...register(column.header, {})}
									className="input-style"
									placeholder={`Enter ${column.header}`}
									type="text"
									id={column.header}
								/>
							</TextInput>
						);
					}
					if (column.searchType === 'NUMBER') {
						return (
							<TextInput
								key={column.accessor}
								name={column.header}
								label={column.header}
								error={errors?.[
									`${column.header}`
								]?.message?.toString()}>
								<input
									{...register(column.header)}
									className="input-style"
									type="number"
									id={column.header}
								/>
							</TextInput>
						);
					}
				})}
			</section>
			{/* <TextInput
				name={'description'}
				placeholder="Enter Description"
				label="Description"
				error={errors?.['description']?.message?.toString()}>
				<textarea
					className="input-style"
					{...register('description', {
						required: 'This field is required'
					})}
					disabled={isSubmitting}
					id="description"
					cols={40}
					rows={3}></textarea>
			</TextInput> */}

			{/* <TextInput
				name={column.header}
				placeholder={`Enter ${column.header}`}
				label={column.header}
				error={errors?.[`${column.header}`]?.message?.toString()}>
				<input
					{...register(column.header, {
						required: 'This field is required'
					})}
					className="input-style"
					type="text"
					id={column.header}
				/>
			</TextInput> */}

			<section className="flex justify-end gap-4">
				<ButtonComponent
					type="reset"
					handleClick={() => {
						cancelFilter();
						onCloseModal();
					}}
					style="rounded-3xl"
					btnText={'Cancel'}></ButtonComponent>

				<ButtonComponent
					type="submit"
					// handleClick={onCloseModal}
					style="rounded-3xl"
					disabled={!formState.isValid}
					btnText={`Search
					`}></ButtonComponent>

				{/* <button type="submit" onClick={onCloseModal}>
					search
				</button> */}
			</section>
		</form>
	);
}

function TableFilter() {
	const { columns, filterIsActive }: any = useContext(TableContext);
	return (
		<div className="">
			<Modal>
				<Modal.Open opens="filter-form">
					<button
						type="button"
						className={`  ${
							filterIsActive
								? 'ring-1  ring-offset-2 text-success  ring-success'
								: ''
						} w-full flex items-center gap-1  text-xs px-4 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn`}>
						{filterIsActive ? (
							<FcFilledFilter size={15} color="green" />
						) : (
							<FcEmptyFilter size={15} />
						)}
						Filter
					</button>
				</Modal.Open>

				<Modal.Window name="filter-form">
					<TableFilterForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

function TableHeader() {
	const { columns, actionable }: any = useContext(TableContext);
	return (
		<thead className="text-xs text-left wheat-light bg-primary   text-white w-full uppercase">
			<tr>
				{/* <th className="px-2 py-4 uppercase">
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
				</th> */}

				<td className="p-2 font-medium md:px-2 md:py-4 whitespace-nowrap">
					<span>S/N</span>
				</td>

				{columns.map((col: Icolumn) => (
					<th
						key={col.header}
						className="py-4 px-2  flex-grow uppercase">
						{col.header}
					</th>
				))}
				{actionable && <th className="px-2 py-4 uppercase">Actions</th>}
			</tr>
		</thead>
	);
}
export function TableHeaderAction({ children }: any) {
	const { handleFilter }: any = useContext(TableContext);
	return (
		<div className="flex flex-col flex-wrap items-center  justify-between mb-2 px-3 overflow-x-auto md:flex-row">
			<div className="flex items-center gap-2 mt-4"></div>

			<div className="flex py-1 flex-wrap items-center gap-3 mt-2 md:gap-2">
				<TableFilter />

				{cloneElement(children, { handleFilter })}

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
	const { columns, data, actionable }: any = useContext(TableContext);

	if (data?.length < 1) {
		return (
			<tbody className=" w-full h-5">
				<tr>
					<td className="  block p-2 text-sm ">No data available</td>
				</tr>
			</tbody>
		);
	}

	return (
		<tbody className="">
			{!customRow
				? data?.map((row: any, i: any) => {
						return (
							<tr
								key={i}
								className="text-left dark:border-none dark:text-white text-secondary px-2 py-1 relative border-b hover:glass ">
								{/* <td className=" font-medium whitespace-nowrap">
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
								</td> */}
								<td className="p-2 font-medium md:px-2 md:py-4 whitespace-nowrap">
									<span>{i + 1}.</span>
								</td>

								{columns.map((column: Icolumn, i: any) => {
									//This logic helps check for more accessors; double items in a row cell
									const value = column.accessor
										?.split('.')
										.reduce((obj, key) => obj[key], row);

									if (column.custom) {
										if (column.custom.type === 'style') {
											return (
												<td
													className={`${
														column.custom.bolden &&
														'font-semibold'
													}`}
													key={column.accessor + i}>
													<span
														title={value}
														className="bg-green-400    text-xs w-1/2 justify-center text-white py-2 px-3 rounded-3xl inline-flex">
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
													} ellipisis-overflow block`}
													title={new Date(
														value
													).toDateString()}
													key={column.accessor + i}>
													{new Date(
														value
													).toDateString()}
												</td>
											);
										}
										if (column.custom.type === 'currency') {
											return (
												<td
													className={`${
														column.custom.bolden &&
														'font-semibold'
													}  `}
													key={column.accessor + i}>
													<span
														title={formatCurrency(
															value
														)}
														className="ellipsis-overflow block">
														{formatCurrency(value)}
													</span>
												</td>
											);
										}
										if (column.custom.type === 'percent') {
											return (
												<td
													className={`${
														column.custom.bolden &&
														'font-semibold'
													} `}
													title={value}
													key={column.accessor + i}>
													{value} %
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
											<span
												title={value}
												className="block ellipsis-overflow">
												{value}
											</span>
										</td>
									);
								})}

								{actionable &&
									cloneElement(children, { rowData: row })}
							</tr>
						);
				  })
				: cloneElement(children, { data })}
		</tbody>
	);
}

function Paginator() {
	const [maxNumPage, setMaxNumPage] = useState(0);

	const {
		updateLimit,
		data,
		limit,
		page,
		totalRecords,
		handlePaginate
	}: any = useContext(TableContext);
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
			<section className="flex-col flex  dark:border-t p-2 gap-1">
				<strong>Summary</strong>
				<p>
					{' '}
					Showing <span>1</span> to <span>{data?.length}</span> of{' '}
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
						onChange={(e) => {
							updateLimit(e.target.value);
							// service(limit, page);
							// setLimit(e.target.value);

							// paginate(e.target.value)
							// handlePaginate(page, e.target.value);
						}}
						value={limit}
						id="sort"
						name="sort"
						title="sortdropdown"
						className="text-xs font-light text-gray-900 focus-within:ring-0 focus-within:border-none border border-gray-300 bg-gray-50 rounded">
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
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
							} flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:glass dark:border-none dark:text-white dark:hover:bg-gray-700 dark:hover:text-white`}>
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
								onClick={() => {
									handlePaginate(val, limit);
								}}
								key={val}>
								<a
									className={`${
										val === page
											? '!bg-primary  text-white'
											: 'bg-white hover:bg-gray-100 dark:hover:text-primary'
									} flex items-center  dark:glass dark:border-none   rounded-3xl justify-center px-4 h-10 leading-tight text-primary cursor-pointer  border border-gray-300 `}>
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
							} flex items-center  justify-center px-4 h-10 leading-tight text-gray-500 bg-white dark:glass border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700  dark:border-none dark:text-white dark:hover:bg-gray-700 dark:hover:text-white`}>
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
