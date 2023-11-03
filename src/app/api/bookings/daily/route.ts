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

		const today = new Date();
		// Reset the time part to match the start of the day (00:00:00)
		today.setHours(0, 0, 0, 0);

		console.log('Today', today);

		// You need to account for timezone offset if your server is not running in UTC
		// If your MongoDB stores dates in UTC, you can convert to UTC as follows
		// const timezoneOffset = today.getTimezoneOffset() * 60000; // offset in milliseconds
		const todayStartUtc = today;

		// To find the end of the day in UTC
		const todayEndUtc = new Date(todayStartUtc);
		// todayEndUtc.setDate(todayEndUtc.getDate() + 1);
		todayEndUtc.setHours(24, 0, 0, 0);
		console.log(todayStartUtc, new Date(todayStartUtc));

		console.log(todayEndUtc);

		const stats = await Booking.aggregate([
			{
				$match: {
					$or: [
						{
							startDate: {
								$gte: todayStartUtc,
								$lt: todayEndUtc
							},

							checkStatus: {
								$eq: 'UNCONFIRMED'
							}
						},
						{
							endDate: {
								$gte: todayStartUtc,
								$lt: todayEndUtc
							},
							checkStatus: {
								$eq: 'CHECKED_IN'
							}
						}
					]

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
					// 	$ne: 'CHECKED_OUT'
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
			},
			{ $limit: 12 }
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
