import React from 'react';
import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip
} from 'recharts';
// import { useDarkMode } from '../Context/DarkModeContext';
import { useDarkMode } from '@/utils/LightDarkModeContext';
import { subDays } from 'date-fns/esm';

const AreaCharts = ({ bookings, numDays }: any) => {
	const { isDarkMode }: any = useDarkMode();
	// const { isDarkMode }: any =
	// const data = [
	// 	{ label: 'Jan 09', totalSales: 480, extrasSales: 320 - 300 },
	// 	{ label: 'Jan 10', totalSales: 580, extrasSales: 400 - 300 },
	// 	{ label: 'Jan 11', totalSales: 550, extrasSales: 450 - 300 },
	// 	{ label: 'Jan 12', totalSales: 600, extrasSales: 350 - 300 },
	// 	{ label: 'Jan 13', totalSales: 700, extrasSales: 550 - 300 },
	// 	{ label: 'Jan 14', totalSales: 800, extrasSales: 650 - 500 },
	// 	{ label: 'Jan 15', totalSales: 700, extrasSales: 700 - 500 },
	// 	{ label: 'Jan 16', totalSales: 650, extrasSales: 500 - 300 },
	// 	{ label: 'Jan 17', totalSales: 600, extrasSales: 600 - 300 },
	// 	{ label: 'Jan 18', totalSales: 550, extrasSales: 400 - 300 },
	// 	{ label: 'Jan 19', totalSales: 700, extrasSales: 600 - 500 },
	// 	{ label: 'Jan 20', totalSales: 800, extrasSales: 700 - 500 },
	// 	{ label: 'Jan 21', totalSales: 700, extrasSales: 600 - 500 },
	// 	{ label: 'Jan 22', totalSales: 810, extrasSales: 550 - 500 },
	// 	{ label: 'Jan 23', totalSales: 950, extrasSales: 750 - 500 },
	// 	{ label: 'Jan 24', totalSales: 970, extrasSales: 600 - 500 },
	// 	{ label: 'Jan 25', totalSales: 900, extrasSales: 700 - 500 },
	// 	{ label: 'Jan 26', totalSales: 950, extrasSales: 800 - 500 },
	// 	{ label: 'Jan 27', totalSales: 850, extrasSales: 700 - 500 },
	// 	{ label: 'Jan 28', totalSales: 900, extrasSales: 600 - 500 },
	// 	{ label: 'Jan 29', totalSales: 800, extrasSales: 800 - 500 },
	// 	{ label: 'Jan 30', totalSales: 950, extrasSales: 700 - 500 },
	// 	{ label: 'Jan 31', totalSales: 1100, extrasSales: 800 - 500 },
	// 	{ label: 'Feb 01', totalSales: 1200, extrasSales: 900 - 500 },
	// 	{ label: 'Feb 02', totalSales: 1250, extrasSales: 800 - 500 },
	// 	{ label: 'Feb 03', totalSales: 1400, extrasSales: 950 - 500 },
	// 	{ label: 'Feb 04', totalSales: 1500, extrasSales: 1000 - 500 },
	// 	{ label: 'Feb 05', totalSales: 1400, extrasSales: 1100 - 500 },
	// 	{ label: 'Feb 06', totalSales: 1450, extrasSales: 900 - 500 }
	// ];

	const colors = isDarkMode
		? {
				totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
				extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
				text: '#fff',
				background: '#18212f'
		  }
		: {
				totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
				extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
				text: '#374151',
				background: '#fff'
		  };

	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date()
	});

	const data = allDates.map((date) => {
		return {
			label: format(date, 'MMM dd'),
			totalSales: bookings
				?.filter((booking: any) =>
					isSameDay(date, new Date(booking.createdAt))
				)
				.reduce((acc: any, cur: any) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				?.filter((booking: any) =>
					isSameDay(date, new Date(booking.createdAt))
				)
				.reduce((acc: any, cur: any) => acc + cur.extrasPrice, 0)
		};
	});

	return (
		<section className="card text-sm p-4 flex flex-col gap-5">
			<span className="font-medium text-sm">
				Sales from {format(allDates.at(0)!, 'MMM dd yyyy')} &mdash;{' '}
				{format(allDates.at(-1)!, 'MMM dd yyyy')}{' '}
			</span>
			<ResponsiveContainer className="text-xs" width="100%" height={300}>
				{/* <AreaChart data={data} width={700} height={300}> */}
				<AreaChart data={data}>
					<XAxis
						dataKey="label"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<YAxis
						unit="$"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<CartesianGrid strokeDasharray="4" />
					<Tooltip
						contentStyle={{ backgroundColor: colors.background }}
					/>
					<Area
						type="monotone"
						dataKey="totalSales"
						// stroke='#4f46e5'
						// fill='#c7d2fe'
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2}
						unit="$"
						name="Total sales"
					/>

					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2}
						name="Extras sales"
						unit="$"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</section>
	);
};

export default AreaCharts;
