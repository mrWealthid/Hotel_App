import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';
import { startOfDay, endOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

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

			total: stats.length,

			data: stats
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
