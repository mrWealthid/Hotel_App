import Booking from '@/model/bookingsModel';
import { startOfDay, endOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		const query: any = request.nextUrl.searchParams;

		const startDate = startOfDay(new Date()).toISOString();

		const endDate = endOfDay(new Date()).toISOString();

		const stats = await Booking.find({
			$or: [
				{
					startDate: { $gte: startDate, $lte: endDate },

					checkStatus: 'UNCONFIRMED'
				},

				{
					endDate: { $gte: startDate, $lte: endDate },

					checkStatus: 'CHECKED_IN'
				}
			]
		}).populate([
			{
				path: 'guests',
				select: 'name email '
			},
			{ path: 'cabin', select: 'name ' }
		]);

		return NextResponse.json({
			status: 'success',
			todayDate: new Date(Date.now()),
			total: stats.length,

			data: stats
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// const startDate = new Date();

// const endDate = new Date();

// const currentDate = new Date();
// const startOfToday = new Date(
// 	currentDate.getFullYear(),
// 	currentDate.getMonth(),
// 	currentDate.getDate()
// );
// const endOfToday = new Date(
// 	currentDate.getFullYear(),
// 	currentDate.getMonth(),
// 	currentDate.getDate() + 1
// );

// const stats = await Booking.find({
// 	$or: [
// 		{
// 			startDate,

// 			checkStatus: 'UNCONFIRMED'
// 		},

// 		{
// 			endDate,

// 			checkStatus: 'CHECKED_IN'
// 		}
// 	]
// }).populate([
// 	{
// 		path: 'guests',
// 		select: 'name email '
// 	},
// 	{ path: 'cabin', select: 'name ' }
// ]);
