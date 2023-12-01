import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';

import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
connect();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
export async function POST(request: NextRequest) {
	try {
		const body = await request.text();
		const signature = headers().get('stripe-signature')!;

		console.log('Signature==>', signature);

		const event = stripe.webhooks.constructEvent(body, signature, secret);

		if (event.type === 'checkout.session.completed') {
			handlePaymentSessionCompleted(event.data.object);
		}

		return NextResponse.json({ result: event, ok: true });
	} catch (err: any) {
		return NextResponse.json(
			{ error: `Webhook Error: ${err.message}` },
			{ status: 400 }
		);
	}

	// Return a 200 response to acknowledge receipt of the event
}

async function handlePaymentSessionCompleted(session: any) {
	const bookingId = session.client_reference_id;

	console.log('Id===>', bookingId);

	await Booking.findByIdAndUpdate(bookingId, {
		isPaid: true
	});
}
