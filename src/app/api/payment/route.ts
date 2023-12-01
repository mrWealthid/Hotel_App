import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';

import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
connect();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
export async function POST(request: NextRequest) {
	let event: Stripe.Event;

	try {
		const body = await request.text();
		const signature = headers().get('stripe-signature')!;
		event = stripe.webhooks.constructEvent(body, signature, secret);
	} catch (err: any) {
		return NextResponse.json(
			{ error: `Webhook Error: ${err.message}` },
			{ status: 400 }
		);
	}
	// Handle the event
	switch (event.type) {
		case 'checkout.session.completed':
			const checkoutSessionCompleted = event.data.object;

			const metadata = event.data.object.metadata;

			if (metadata && metadata.source === 'Payment') {
				handlePaymentSessionCompleted(checkoutSessionCompleted);
			}
			break;

		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	// Return a 200 response to acknowledge receipt of the event
	return NextResponse.json(
		{
			status: 'success',
			mesage: 'Recieved'
		},
		{ status: 200 }
	);
}

async function handlePaymentSessionCompleted(session: any) {
	const bookingId = session.client_reference_id;

	await Booking.findByIdAndUpdate(bookingId, {
		isPaid: true
	});
}
