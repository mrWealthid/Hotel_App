import { connect } from '@/dbConfig/dbConfig';
import Guest from '@/model/guestModel';
import APIFeatures from '../utils/apiFeatures';
import { NextRequest, NextResponse } from 'next/server';

// connect();

export async function POST(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';

		const body = await request.json();

		const guest = await Guest.create(body);

		const response = NextResponse.json(
			{
				status: 'success',
				data: guest
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
		// console.log(jwtVerifyPromisified('cookie'));

		// console.log(getUserDetails(cookie));

		// const userId = getUserDetails(cookie);

		// const method = request.method;
		// console.log(method);

		// const body = await request.json();

		let filter = {};
		const query: any = request.nextUrl.searchParams;
		const transformedQuery = mapToObject(query);

		const features = new APIFeatures(Guest.find(filter), transformedQuery)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const guests = await features.query;

		let count;

		// console.log( await Model.find(req.query))

		//I did this because pagination of filtered data was impossible, The endpoint keeps returning the total count of all document
		console.log('Query', Object.values(transformedQuery).length);
		if (Object.values(transformedQuery).length > 0) {
			const excludedFields = ['page', 'sort', 'limit', 'fields'];
			excludedFields.forEach((el) => delete transformedQuery[el]);
			count = await Guest.find(filter).find(transformedQuery).count();
		} else {
			count = await Guest.count(filter);
		}

		// const user = await User.findOne({ _id: userId });

		const response = NextResponse.json({
			status: 'success',
			totalRecords: count,
			results: guests.length,
			data: guests
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
