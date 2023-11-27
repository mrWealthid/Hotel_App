import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';
import { NextRequest, NextResponse } from 'next/server';

connect();
export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		const stats = await Booking.find().populate([
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
