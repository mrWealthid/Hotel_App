import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Emails } from '@/utils/email-resend';
import crypto from 'crypto';

connect();

const signToken = (id: any) =>
	jwt.sign({ id }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});

export async function POST(request: NextRequest) {
	const { newPassword, currentPassword, confirmNewPassword, resetToken } =
		await request.json();

	console.log('RESET', resetToken);
	try {
		//3 If so, update password

		const hashedToken = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex');

		console.log('Hashed', hashedToken);

		const user = await User.findOne({
			// passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() }
		});

		console.log('NOW', Date.now());

		console.log('User', user);

		// console.log({ Password: user.password });

		// 2 Check if current the password is correct
		if (!(await user.correctPassword(currentPassword, user.password))) {
			return NextResponse.json(
				{ error: 'Your current password is wrong' },
				{ status: 400 }
			);
		}

		//3 Check if the current password and the new password is the same

		if (currentPassword === newPassword) {
			return NextResponse.json(
				{ error: "You can't use your old password" },
				{ status: 400 }
			);
		}

		//2) If token has not expired and there is a user, set the new password
		if (!user) {
			return NextResponse.json(
				{ error: 'Token is invalid or has expired' },
				{ status: 400 }
			);
		}
		user.password = newPassword;
		user.passwordConfirm = confirmNewPassword;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();
		//3 Update changedpasswordAt property for the user

		//4 Log the user in, send JWT

		const token = signToken(user._id);
		const response = NextResponse.json({
			status: 'success',
			message:
				'Password reset successfully! Kindly Login with Credentials'
		});

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
