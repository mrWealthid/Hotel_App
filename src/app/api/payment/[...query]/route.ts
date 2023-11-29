import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
connect();

export async function GET(request: NextRequest, { params }: any) {
	console.log(params);

	const bookingId = params.query[0];

	const bookings = await Booking.findOne({ _id: bookingId }).populate([
		{
			path: 'guests',
			select: 'name email nationalId '
		},
		{ path: 'cabin', select: 'name description image' }
	]);

	console.log(bookings);
	try {
		//2) Check if user exists & password is correct after it's hashed
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			success_url: process.env.STRIPE_SUCCESS_URL,

			cancel_url: process.env.STRIPE_FAILURE_URL,
			customer_email: bookings.guests.email,
			client_reference_id: bookingId,

			mode: 'payment',
			line_items: [
				{
					price_data: {
						currency: 'usd',
						unit_amount: bookings.totalPrice * 100,
						product_data: {
							name: `${bookings.cabin.name}`,
							description: bookings.cabin.description,
							images: [bookings.cabin?.image]
						}
					},
					quantity: 1
				}
			],

			metadata: {
				source: 'Payment',
				bookingId: bookings.id
			}
		});

		const response = NextResponse.json({
			status: 'success',
			session
			// data: settings[0]
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
