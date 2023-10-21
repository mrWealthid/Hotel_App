import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModel';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		// const cookie = cookies()?.get('token')?.value;
		let cookie = request.cookies.get('token')?.value || '';

		console.log('check-token', request.cookies.has('token'));

		// const test = localStorage.getItem('token');

		// console.log('My-Token', test);

		console.log('my-cookie', cookie);
		// console.log(jwtVerifyPromisified('cookie'));

		const currentUserId = getUserDetails(cookie!);

		const user = await User.findById(currentUserId);
		console.log(user);

		if (!user)
			NextResponse.json({ error: 'User not found' }, { status: 404 });

		const response = NextResponse.json(
			{
				status: 'success',
				data: user
			},
			{ status: 200 }
		);
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

function getUserDetails(token: string) {
	console.log('Sent_Cookie', token);
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
