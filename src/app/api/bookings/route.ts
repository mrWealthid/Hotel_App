import Guest from '@/model/guestModel';
import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';

import APIFeatures from '../utils/apiFeatures';
import { NextRequest, NextResponse } from 'next/server';
import Cabin from '@/model/cabinModel';

connect();

function calculateDaysBetweenDates(startDate: Date, endDate: Date) {
	// One day in milliseconds
	const oneDay = 1000 * 60 * 60 * 24;

	// Convert both dates to milliseconds
	const startDate_ms = new Date(startDate).getTime();
	const endDate_ms = new Date(endDate).getTime();

	// Calculate the difference in milliseconds
	const difference_ms = Math.abs(startDate_ms - endDate_ms);

	// Convert back to days and return
	return Math.round(difference_ms / oneDay);
}

// Example usage:
// Assuming you have two dates in the format 'yyyy-mm-dd'
// const startDate = new Date('2023-11-01');
// const endDate = new Date('2023-11-10');

// const daysBetween = calculateDaysBetweenDates(startDate, endDate);

// console.log(daysBetween); // Output will be the number of days between the two dates

export async function POST(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';

		const body = await request.json();

		const { startDate, endDate } = body;

		// console.log({ startDate: startDate.split('T')[0] });
		// console.log({ endDate: endDate.split('T')[0] });

		// const numNights = calculateDaysBetweenDates(startDate, endDate);

		const payload = {
			...body,
			startDate: startDate,
			endDate: endDate,
			totalPrice: body.cabinPrice + (body.extrasPrice || 0)
		};

		const Bookings = await Booking.create(payload);

		const response = NextResponse.json(
			{
				status: 'success',
				data: Bookings
			},
			{ status: 201 }
		);

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

function mapToObject(map: Map<string, any>): { [key: string]: any } {
	const obj: { [key: string]: any } = {};
	for (let [key, value] of map) {
		// Checking if the value is a string representation of a number
		if (typeof value === 'string' && !isNaN(Number(value))) {
			value = Number(value);
		}
		obj[key] = value;
	}
	return obj;
}

export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';

		const query: any = request.nextUrl.searchParams;

		const transformedQuery = mapToObject(query);

		let filter = {};

		const bookingQuery = Booking.find(filter).populate([
			{
				path: 'guests',
				select: 'name email nationality '
			},
			{ path: 'cabin', select: 'name ' }
		]);

		//This is to implement search for nested fields (populated fields)
		if ('guests' in transformedQuery) {
			const guestName = transformedQuery['guests'];
			const guestFound = await Guest.findOne({ name: guestName });
			// console.log('guest found', guestFound);
			transformedQuery['guests'] = guestFound ? guestFound._id : null;
			// delete transformedQuery['guest'];
		}
		if ('cabin' in transformedQuery) {
			const cabinName = transformedQuery['cabin'];
			const cabinFound = await Cabin.findOne({ name: cabinName });
			// console.log('guest found', guestFound);
			transformedQuery['cabin'] = cabinFound ? cabinFound._id : null;
			// delete transformedQuery['guest'];
		}

		const features = new APIFeatures(bookingQuery, transformedQuery)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const bookings = await features.query;

		let count;

		// console.log( await Model.find(req.query))

		//I did this because pagination of filtered data was impossible, The endpoint keeps returning the total count of all document
		console.log('Query', Object.values(transformedQuery).length);
		if (Object.values(transformedQuery).length > 0) {
			const excludedFields = ['page', 'sort', 'limit', 'fields'];
			excludedFields.forEach((el) => delete transformedQuery[el]);
			count = await Booking.find(filter).find(transformedQuery).count();
		} else {
			count = await Booking.count(filter);
		}

		// const modifiedBooking = bookings.map((booking: any) => ({
		// 	...booking,
		// 	guestName: booking.guests.name,
		// 	cabinName: booking.cabin.name
		// }));

		// console.log(modifiedBooking);

		const response = NextResponse.json(
			{
				status: 'success',
				totalRecords: count,
				results: bookings.length,
				data: bookings
			},
			{ status: 200 }
		);

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
