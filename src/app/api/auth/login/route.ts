import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Email } from '@/utils/email';

connect();

const signToken = (id: any) =>
	jwt.sign({ id }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();
		//1) Check if emails and password exists
		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Please provide email and password' },
				{ status: 400 }
			);
		}
		//2) Check if user exists & password is correct after it's hashed
		const user = await User.findOne({
			email
		}).select('+password');

		// if(!user) {
		//   return next(new AppError("User does not exit", 401));
		// }

		if (!user || !(await user.correctPassword(password, user.password))) {
			return NextResponse.json(
				{ error: 'Incorrect email or password' },
				{ status: 400 }
			);
		}

		await new Email(user, 'www.test.com').sendPasswordReset();

		//3) If everything is ok, send token to client

		const token = signToken(user._id);
		const response = NextResponse.json({
			status: 'success',
			token
		});

		console.log('cookie exp', process.env.JWT_COOKIE_EXPIRES_IN);
		const timeInMs = Number(process.env.JWT_COOKIE_EXPIRES_IN) * 60 * 1000; // 2 minutes in milliseconds
		const expires = new Date(Date.now() + timeInMs);
		response.cookies.set('token', token, {
			httpOnly: true,
			expires
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
