import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';
import { NextRequest, NextResponse } from 'next/server';

import { startOfDay, formatISO, endOfDay } from 'date-fns';

connect();

export async function GET(request: NextRequest, { params }: any) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		// const stats = await Booking.aggregate([
		// 	{
		// 		$lookup: {
		// 			from: 'guests', // the collection to join with
		// 			localField: 'guests', // field from the bookings collection
		// 			foreignField: '_id', // field from the guests collection
		// 			as: 'guests' // the output array field with the joined guest information
		// 		}
		// 	},
		// 	{
		// 		$lookup: {
		// 			from: 'cabins', // the collection to join with
		// 			localField: 'cabin', // field from the bookings collection
		// 			foreignField: '_id', // field from the guests collection
		// 			as: 'cabin' // the output array field with the joined guest information
		// 		}
		// 	},
		// 	{
		// 		$unwind: '$guests' // Optional: Converts the array to an object. Use if you expect one match per booking.
		// 	},
		// 	{
		// 		$unwind: '$cabin' // Optional: Converts the array to an object. Use if you expect one match per booking.
		// 	},

		// 	{
		// 		$match: {
		// 			$or: [
		// 				{
		// 					$and: [
		// 						{
		// 							$expr: {
		// 								$eq: [
		// 									{
		// 										$dateToString: {
		// 											format: '%Y-%m-%d',
		// 											date: '$startDate'
		// 										}
		// 									},
		// 									{
		// 										$dateToString: {
		// 											format: '%Y-%m-%d',
		// 											date: new Date()
		// 										}
		// 									}
		// 								]
		// 							}
		// 						},
		// 						{ checkStatus: 'UNCONFIRMED' }
		// 					]
		// 				},
		// 				{
		// 					$and: [
		// 						{
		// 							$expr: {
		// 								$eq: [
		// 									{
		// 										$dateToString: {
		// 											format: '%Y-%m-%d',
		// 											date: '$endDate'
		// 										}
		// 									},
		// 									{
		// 										$dateToString: {
		// 											format: '%Y-%m-%d',
		// 											date: new Date()
		// 										}
		// 									}
		// 								]
		// 							}
		// 						},
		// 						{ checkStatus: 'CHECKED_IN' }
		// 					]
		// 				}
		// 			]
		// 		}
		// 	},

		// 	{
		// 		$project: {
		// 			__v: 0,
		// 			'guests._id': 0, // Exclude sensitiveField
		// 			'guests.nationalId': 0,
		// 			'guests.createdAt': 0,
		// 			'guests.__v': 0,
		// 			'cabin._id': 0, // Exclude sensitiveField
		// 			'cabin.createdAt': 0,
		// 			'cabin.__v': 0
		// 		}
		// 	}
		// ]);
		const todayUTC = new Date().toISOString().split('T')[0];
		// const stats = await Booking.find({
		// 	$or: [
		// 		{
		// 			startDate: today,
		// 			checkStatus: 'UNCONFIRMED'
		// 		},
		// 		{
		// 			endDate: today,
		// 			checkStatus: 'CHECKED_IN'
		// 		}
		// 	]
		// });
		const stats = await Booking.find({
			$or: [
				{
					$and: [
						{
							$expr: {
								$eq: [
									{
										$dateToString: {
											format: '%Y-%m-%d',
											date: '$startDate',
											timezone: 'UTC'
										}
									},
									todayUTC
								]
							}
						},
						{ checkStatus: 'UNCONFIRMED' }
					]
				},
				{
					$and: [
						{
							$expr: {
								$eq: [
									{
										$dateToString: {
											format: '%Y-%m-%d',
											date: '$endDate',
											timezone: 'UTC'
										}
									},
									todayUTC
								]
							}
						},
						{ checkStatus: 'CHECKED_IN' }
					]
				}
			]
		});

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
