import Booking from '@/model/bookingsModel';
import { NextRequest, NextResponse } from 'next/server';
import { mapToObject } from '../utils/helpers';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest, { params }: any) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		// const bookings = await Booking.find();

		const query: any = request.nextUrl.searchParams;

		let { days } = mapToObject(query);

		days = days * 1;

		console.log(days);
		// const { type } = req.params;

		// const isAdmin = req.user.role === 'admin';

		const calcDate = new Date(
			new Date().setDate(new Date().getDate() - days)
		);

		const stats = await Booking.aggregate([
			{
				$match: {
					// createdAt: {
					// 	$gte: calcDate,
					// 	$lte: new Date(Date.now())
					// },
					checkStatus: {
						$ne: 'UNCONFIRMED'
					}

					// $or: [
					// 	{
					// 		$and: [
					// 			{
					// 				user: {
					// 					$eq: new Types.ObjectId()
					// 				}
					// 			}
					// 		]
					// 	},

					// ],
					// checkStatus: {
					// 	$neq: 'UNCONFIRMED'
					// }
				}
			},

			// {
			// 	$group: {
			// 		_id: {},
			// 		total: { $sum: 1 }
			// 	}
			// },
			// { $addFields: { time: '$_id' } },

			{
				$project: { __v: 0 }
			},
			{
				$sort: {
					'time.monthNum': 1
				}
			}
		]);

		const response = NextResponse.json({
			status: 'success',
			total: stats.length,
			data: stats
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
