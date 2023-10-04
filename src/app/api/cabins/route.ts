import { connect } from '@/dbConfig/dbConfig';
import Cabin from '@/model/cabinModel';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import APIFeatures from '@/utils/services/apiFeatures';

connect();

export async function POST(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed
		revalidateTag('cabins');
		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		// console.log(getUserDetails(cookie));

		// const userId = getUserDetails(cookie);

		const body = await request.json();

		const cabin = await Cabin.create(body);

		const response = NextResponse.json(
			{
				status: 'success',
				data: cabin
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

		const query: any = request.nextUrl.searchParams;

		const transformedQuery = mapToObject(query);

		console.log(transformedQuery);

		let filter = {};
		const features = new APIFeatures(Cabin.find(filter), transformedQuery)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const cabin = await features.query;

		//   const doc = await Model.create(req.body);
		// const user = await User.findOne({ _id: userId });

		const response = NextResponse.json({
			status: 'success',
			data: cabin
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
// export async function GET(request: NextRequest) {
// 	try {
// 		//2) Check if user exists & password is correct after it's hashed

// 		let cookie = request.cookies.get('token')?.value || '';
// 		// console.log(jwtVerifyPromisified('cookie'));

// 		// console.log(getUserDetails(cookie));

// 		// const userId = getUserDetails(cookie);

// 		// const method = request.method;
// 		// console.log(method);

// 		// const body = await request.json();

// 		const cabin = await Cabin.find();

// 		//   const doc = await Model.create(req.body);
// 		// const user = await User.findOne({ _id: userId });

// 		const response = NextResponse.json({
// 			status: 'success',
// 			data: cabin
// 		});

// 		return response;
// 	} catch (error: any) {
// 		return NextResponse.json({ error: error.message }, { status: 500 });
// 	}
// }
