import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';
import { NextRequest, NextResponse } from 'next/server';
import { mapToObject } from '../../utils/helpers';
import { Types } from 'mongoose';

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
					createdAt: {
						$gte: calcDate,
						$lte: new Date(Date.now())
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
					// transactionType: {
					// 	$eq: `${type}`
					// }
				}
			},

			// {
			// 	$group: {
			// 		_id: {
			// 			$switch: {
			// 				branches: [
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 1]
			// 						},
			// 						then: { month: 'January', monthNum: 1 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 2]
			// 						},
			// 						then: { month: 'February', monthNum: 2 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 3]
			// 						},
			// 						then: { month: 'March', monthNum: 3 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 4]
			// 						},
			// 						then: { month: 'April', monthNum: 4 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 5]
			// 						},
			// 						then: { month: 'May', monthNum: 5 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 6]
			// 						},
			// 						then: { month: 'June', monthNum: 6 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 7]
			// 						},
			// 						then: { month: 'July', monthNum: 7 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 8]
			// 						},
			// 						then: { month: 'August', monthNum: 8 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 9]
			// 						},
			// 						then: { month: 'September', monthNum: 9 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 10]
			// 						},
			// 						then: { month: 'October', monthNum: 10 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 11]
			// 						},
			// 						then: { month: 'November', monthNum: 11 }
			// 					},
			// 					{
			// 						case: {
			// 							$eq: [{ $month: '$createdAt' }, 12]
			// 						},
			// 						then: { month: 'December', monthNum: 12 }
			// 					}
			// 				],
			// 				default: 'Invalid'
			// 			}
			// 		},
			// 		total: { $sum: 1 },
			// 		// transactions: { $addToSet: '$amount' },
			// 		transactions: { $push: '$amount' },
			// 		totalAmount: { $sum: '$amount' }
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
