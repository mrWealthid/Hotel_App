import { connect } from '@/dbConfig/dbConfig';
import Cabin from '@/model/cabinModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		// console.log(getUserDetails(cookie));

		// const userId = getUserDetails(cookie);

		const body = await request.json();

		const cabin = await Cabin.create(body);

		const response = NextResponse.json({
			status: 'success',
			data: cabin
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
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

		const cabin = await Cabin.find();

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
