'use client';
import { revalidateTag } from 'next/cache';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const BookingsHeaderActions = ({ handleFilter }: any) => {
	const router = useRouter();

	const [asc, setAsc] = useState(false);
	const searchParams = useSearchParams()!;

	const params = new URLSearchParams(searchParams);

	// params.set('name', 'wealth');

	console.log(params);

	const [query, setQuery] = useState<{
		checkStatus: string;
	} | null>(null);

	console.log(query);
	async function handleClick(query: any) {
		setQuery(query);
		query === 'val' ? handleFilter(null) : handleFilter(query);

		// const url = query
		// 	? `http://localhost:3000/api/bookings?${query.name}${operator}${query.val}`
		// 	: `http://localhost:3000/api/bookings?`;
		// try {
		// 	const res = await fetch(url, {
		// 		next: { tags: ['cabins'] }
		// 	});

		// 	if (!res.ok) {
		// 		throw new Error(
		// 			`Cabin could not be created checkStatus: ${res.status}`
		// 		);
		// 	}
		// 	// router.refresh();
		// 	const data = await res.json();

		// 	console.log(data.data);
		// 	updateStateData(data.data);

		// 	// parses JSON response into native JavaScript objects
		// } catch (err) {
		// 	console.log(err);
		// }
	}

	return (
		<>
			<div className="">
				<button
					onClick={() => handleClick(null)}
					type="button"
					className={`${
						query === null && 'bg-primary text-white'
					} w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn`}>
					All
				</button>
			</div>

			<div className="">
				<button
					onClick={() => handleClick({ checkStatus: 'CHECKED_IN' })}
					type="button"
					className={`${
						query?.checkStatus === 'CHECKED_IN' &&
						'bg-primary text-white'
					} w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn`}>
					Checked In
				</button>
			</div>
			<div className="">
				<button
					onClick={() =>
						handleClick({
							checkStatus: 'CHECKED_OUT'
						})
					}
					type="button"
					className={`${
						query?.checkStatus === 'CHECKED_OUT' &&
						'bg-primary text-white'
					} w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn`}>
					{' '}
					Checked-Out
				</button>
			</div>

			<div className="">
				<button
					onClick={() =>
						handleClick({
							checkStatus: 'UNCONFIRMED'
						})
					}
					type="button"
					className={`${
						query?.checkStatus === 'UNCONFIRMED' &&
						'bg-primary text-white'
					} w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn`}>
					Un-Confirmed
				</button>
			</div>
			{/*
			<select
				id="sort"
				name="sort"
				title="sortdropdown"
				className="text-xs font-light text-gray-900 focus-within:ring-0 focus-within:border-none border border-gray-300 bg-gray-50 rounded">
				<option value="">Sort By Amount(Highest)</option>
				<option value="">Sort By Amount(Lowest)</option>
				<option value="">Sort By Date(Recent)</option>
				<option value="">Sort By Date(Lowest)</option>
			</select> */}
		</>
	);
};

export default BookingsHeaderActions;
