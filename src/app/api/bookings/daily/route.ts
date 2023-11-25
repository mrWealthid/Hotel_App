import { connect } from '@/dbConfig/dbConfig';

import Booking from '@/model/bookingsModel';

import { NextRequest, NextResponse } from 'next/server';

import { startOfDay, formatISO, endOfDay } from 'date-fns';

connect();

export async function GET(request: NextRequest, { params }: any) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';

		const startDate = startOfDay(new Date()).toISOString();

		const endDate = endOfDay(new Date()).toISOString();

		const stats = await Booking.find({
			$or: [
				{
					startDate,

					checkStatus: 'UNCONFIRMED'
				},

				{
					endDate,

					checkStatus: 'CHECKED_IN'
				}
			]
		});

		return NextResponse.json({
			status: 'success',

			total: stats.length,

			data: stats
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
