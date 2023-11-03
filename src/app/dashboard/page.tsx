'use client';
import React, { useState } from 'react';
import {
	useDailyActivites,
	useRecentBookings,
	useRecentStays
} from './hooks/useDashboard';
import StatsComponent from '@/components/ui/StatsComponent';

import StatComponent from '@/components/ui/StatComponent';
import { useCabins } from './cabins/hooks/useCabins';
import AreaCharts from '@/components/shared/Charts/AreaChart';
import PieCharts from '@/components/shared/Charts/PieChart';

const Page = () => {
	const [days, setDays] = useState<number>(7);

	// console.log(query);
	async function handleClick(query: any) {
		setDays(query);
		// handleFilter(query);
	}

	const { bookingsError, bookingsLoading, bookings } =
		useRecentBookings(days);
	const { staysLoading, staysError, stays, numDays } = useRecentStays(days);
	const { dailyLoading, dailyError, daily } = useDailyActivites();
	const { totalRecords } = useCabins();

	// function handleFilter() {
	// 	// setfilterIsActive(false);
	// 	// setSearch(null);
	// 	return;
	// }

	return (
		<div className=" flex flex-col gap-5">
			<section className="flex mt justify-between items-center">
				<h1 className="title">My Dashboard Page</h1>

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
			</section>

			<section>
				<StatsComponent
					bookings={bookings}
					numDays={numDays}
					cabinCount={totalRecords}
					stays={stays}
				/>
			</section>

			<section className="w-full flex-1 flex ">
				<section className="w-1/2">
					<p className="font-medium text-sm">
						Today&apos;s Activities
					</p>
				</section>

				<section className="w-1/2">
					<PieCharts confirmedStays={stays} />
				</section>
			</section>
			<AreaCharts bookings={bookings} numDays={numDays} />
		</div>
	);
};

export default Page;
