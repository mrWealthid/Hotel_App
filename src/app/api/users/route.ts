import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';

import jwt, { VerifyErrors, verify } from 'jsonwebtoken';

connect();

export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		// console.log(getUserDetails(cookie));

		// const userId = getUserDetails(cookie);

		const user = await User.find();
		// const user = await User.findOne({ _id: userId });

		const response = NextResponse.json({
			status: 'success',
			data: user
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

function getUserDetails(token: string) {
	try {
		const decodedToken: any = verify(token, process.env.JWT_SECRET!);
		console.log(decodedToken);
		console.log('I got here');
		return decodedToken.id;
	} catch (err: any) {
		// console.log('My error', err);
		throw new Error(err.message);
	}
}
