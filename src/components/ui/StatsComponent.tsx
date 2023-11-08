import React from 'react';
import StatComponent from './StatComponent';
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar
} from 'react-icons/hi2';
import { formatCurrency } from '@/utils/helpers';

const StatsComponent = ({ bookings, stays, numDays, cabinCount }: any) => {
	const numBookings = bookings?.length;

	// 2.
	const sales = bookings?.reduce(
		(acc: any, cur: any) => acc + cur.totalPrice,
		0
	);

	// 3.
	const checkins = stays?.length;

	// 4.
	const occupation =
		stays?.reduce((acc: any, cur: any) => acc + cur.numNights, 0) /
		(numDays * cabinCount);
	// num checked in nights / all available nights (num days * num cabins)
	return (
		<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-col-1 sm:grid-cols-2  gap-4">
			<StatComponent
				title="Bookings"
				icon={<HiOutlineBriefcase color="blue" />}
				value={numBookings}
			/>
			<StatComponent
				title="Sales"
				icon={<HiOutlineBanknotes color="green" />}
				value={formatCurrency(sales)}
			/>
			<StatComponent
				title="Check ins"
				icon={<HiOutlineCalendarDays color="indigo" />}
				value={checkins}
			/>

			<StatComponent
				title="Occupancy rate"
				icon={<HiOutlineChartBar color="yellow" />}
				value={Math.round(occupation * 100) + '%'}
			/>
		</div>
	);
};

export default StatsComponent;
