'use client';
import React, { useState } from 'react';
import { useRecentBookings, useRecentStays } from './hooks/useDashboard';
import StatsComponent from '@/components/ui/StatsComponent';

const Page = () => {
	const [days, setDays] = useState<number>(7);

	// console.log(query);
	async function handleClick(query: any) {
		setDays(query);
		// handleFilter(query);
	}

	const { bookingsError, bookingsLoading, bookings } =
		useRecentBookings(days);
	const { staysLoading, staysError, stays } = useRecentStays(days);

	// function handleFilter() {
	// 	// setfilterIsActive(false);
	// 	// setSearch(null);
	// 	return;
	// }

	return (
		<div>
			My Dashboard Page
			<section className=" flex gap-2 justify-end">
				<div className="">
					<button
						onClick={() => handleClick(7)}
						type="button"
						className={`${
							days === 7 && 'bg-primary text-white'
						} w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn`}>
						Last 7 days
					</button>
				</div>

				<div className="">
					<button
						onClick={() => handleClick(30)}
						type="button"
						className={`${
							days === 30 && 'bg-primary text-white'
						} w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn`}>
						Last 30 days
					</button>
				</div>
				<div className="">
					<button
						onClick={() => handleClick(90)}
						type="button"
						className={`${
							days === 90 && 'bg-primary text-white'
						} w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn`}>
						{' '}
						Last 90 days
					</button>
				</div>
			</section>
			<StatsComponent bookings={bookings} stays={stays} />
		</div>
	);
};

export default Page;
