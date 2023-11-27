import { NextRequest, NextResponse } from 'next/server';
import { mapToObject } from '../utils/helpers';
import Cabin from '@/model/cabinModel';
import Booking from '@/model/bookingsModel';

export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		const query: any = request.nextUrl.searchParams;

		const startDate = new Date();

		const endDate = new Date();

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
		}).populate([
			{
				path: 'guests',
				select: 'name email '
			},
			{ path: 'cabin', select: 'name ' }
		]);

		const response = NextResponse.json({
			status: 'success',
			today: new Date(),
			data: stats
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
