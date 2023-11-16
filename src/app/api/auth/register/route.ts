import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

const signToken = (id: any) =>
	jwt.sign({ id }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});

const createSendToken = (user: any, statusCode: any) => {
	const token = signToken(user._id);

	// const cookieOptions: {expires:any, httpOnly: boolean} = {
	// 	// expires: new Date(Date.now() + process.env?.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000),

	// 	httpOnly: true,
	// 	// secure: req.secure || req.header('x-forwarded-proto') === 'https'
	// };

	// if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	// res.cookie('jwt', token, cookieOptions);

	//Remove password from output
	user.password = undefined;
	const response = NextResponse.json(
		{
			status: 'success',
			token,
			data: {
				user
			}
		},
		{ status: 201 }
	);
	const timeInMs = Number(process.env.JWT_COOKIE_EXPIRES_IN) * 60 * 1000; // 2 minutes in milliseconds
	const expires = new Date(Date.now() + timeInMs);
	response.cookies.set('token', token, {
		httpOnly: true,
		expires
	});

	return response;
};

export async function POST(request: NextRequest) {
	// const req = await request.json();
	//

	// const newUser = await User.create({
	// 	name: req.body.name,
	// 	email: req.body.email,
	// 	password: req.body.password,
	// 	role: req.body.role,

	// 	dateOfBirth: req.body.dateOfBirth
	// });
	// const url = `${req.protocol}://${req.get('host')}/me`;
	//   const url = `https://wealthtech.netlify.app/dashboard`

	//   console.log(url)

	//   await new Email(newUser, url).sendWelcome();
	// await new Email(newUser, url).sendMyMail()

	// createSendToken(newUser, 201, req, response);

	try {
		const req = await request.json();

		const checkIfUserExist = await User.findOne({ email: req.email });
		if (checkIfUserExist)
			return NextResponse.json(
				{ error: 'Email is already in use' },
				{ status: 400 }
			);

		const newUser = await User.create({
			name: req.name,
			email: req.email,
			password: req.password,
			role: req.role
		});
		console.log(newUser);

		//send verification email

		return createSendToken(newUser, 201);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	// try {
	// 	const reqBody = await request.json();
	// 	const { email, password } = reqBody;
	// 	console.log(reqBody);

	// 	//check if user exists
	// 	const user = await User.findOne({ email });
	// 	if (!user) {
	// 		return NextResponse.json(
	// 			{ error: 'User does not exist' },
	// 			{ status: 400 }
	// 		);
	// 	}
	// 	console.log('user exists');

	// 	//check if password is correct
	// 	const validPassword = await bcryptjs.compare(password, user.password);
	// 	if (!validPassword) {
	// 		return NextResponse.json(
	// 			{ error: 'Invalid password' },
	// 			{ status: 400 }
	// 		);
	// 	}
	// 	console.log(user);

	// 	//create token data
	// 	const tokenData = {
	// 		id: user._id,
	// 		username: user.username,
	// 		email: user.email
	// 	};
	// 	//create token
	// 	const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
	// 		expiresIn: '1d'
	// 	});

	// 	const response = NextResponse.json({
	// 		message: 'Login successful',
	// 		success: true
	// 	});
	// 	response.cookies.set('token', token, {
	// 		httpOnly: true
	// 	});
	// 	return response;
	// } catch (error: any) {
	// 	return NextResponse.json({ error: error.message }, { status: 500 });
	// }
}
