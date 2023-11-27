import { connect } from '@/dbConfig/dbConfig';

import Booking from '@/model/bookingsModel';

import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';

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
		// const todaysDate = Date.now();

		// console.log('Current Date', new Date(Date.now()));

		return NextResponse.json({
			status: 'success'
			// date: new Date(todaysDate),

			// total: stats.length,

			// data: stats
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
