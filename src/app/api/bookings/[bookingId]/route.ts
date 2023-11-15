import Booking from '@/model/bookingsModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		const bookingId = params.bookingId;

		// console.log(getUserDetails(cookie));

		// const userId = getUserDetails(cookie);

		// const method = request.method;
		// console.log(method);

		// const body = await request.json();
		console.log(bookingId);

		const booking = await Booking.findOne({ _id: bookingId }).populate([
			{
				path: 'guests',
				select: 'name email nationalId '
			},
			{ path: 'cabin', select: 'name ' }
		]);

		//   const doc = await Model.create(req.body);
		// const user = await User.findOne({ _id: userId });

		console.log({ booking });
		const response = NextResponse.json({
			status: 'success',
			data: booking
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: any) {
	const body = await request.json();

	try {
		const bookingId = params.bookingId;

		const updatedBooking = await Booking.findByIdAndUpdate(
			bookingId,
			body,
			{
				new: true,
				runValidators: true
			}
		);

		if (!updatedBooking) {
			return NextResponse.json(
				{ error: 'No Booking found with ID' },
				{ status: 404 }
			);
		}
		const response = NextResponse.json({
			message: 'Booking Updated Successfully',
			success: true,
			data: updatedBooking
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
