import BookingForm from '@/app/dashboard/bookings/BookingForm';
import { connect } from '@/dbConfig/dbConfig';
import Booking from '@/model/bookingsModel';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
connect();

export async function GET(request: NextRequest, { params }: any) {
	const headers = new Headers(request.headers);
	headers.get('stripe-signature');
	const sig = headers.get('stripe-signature');
	const body = await request.json();
	console.log(sig);
	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);
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

	// try {
	// 	//2) Check if user exists & password is correct after it's hashed
	// 	const session = await stripe.checkout.sessions.create({
	// 		payment_method_types: ['card'],
	// 		success_url: process.env.STRIPE_SUCCESS_URL,
	// 		cancel_url: process.env.STRIPE_FAILURE_URL,
	// 		customer_email: req.user.email,
	// 		client_reference_id: beneficiary.id,
	// 		mode: 'payment',
	// 		line_items: [
	// 			{
	// 				price_data: {
	// 					currency: 'usd',
	// 					unit_amount: amount * 100,
	// 					product_data: {
	// 						name: `${beneficiary.name}`,
	// 						description: beneficiary.accountNumber,
	// 						images: [beneficiary.imgUrl]
	// 					}
	// 				},
	// 				quantity: 1
	// 			}
	// 		],
	// 		metadata: {
	// 			source: 'Payment'
	// 		}
	// 	});
	// 	const response = NextResponse.json({
	// 		status: 'success',
	// 		session
	// 		// data: settings[0]
	// 	});
	// 	return response;
	// } catch (error: any) {
	// 	return NextResponse.json({ error: error.message }, { status: 500 });
	// }
}

async function handlePaymentSessionCompleted(session: any) {
	const beneficiaryId = session.client_reference_id;
	const email = session.customer_details.email;

	// const beneficiary = await User.findById(beneficiaryId);
	// const userDetails = await User.find({ email: email });

	// const initiator = userDetails.initiatorAccountNumber;
	// const beneficiary = beneficiaryDetails.beneficiaryAccountNumber;

	// if (initiator === beneficiary)
	//   return next(new AppError("You can't Transfer to self", 404));

	// const payload = {
	// 	initiatorName: userDetails[0].name,
	// 	beneficiaryAccountNumber: beneficiary.accountNumber,
	// 	initiatorAccountNumber: userDetails[0].accountNumber,
	// 	amount: session.amount_total / 100,
	// 	transactionType: 'Credit',
	// 	user: beneficiary.id,
	// 	createdAt: new Date(Date.now())
	// };

	await Booking.findByIdAndUpdate(session.client_reference_id, {
		isPaid: true
	});

	//settlement
	// await Transaction.create({...payload, amount: (session.amount_total/100) * -1, transactionType:'Debit',  user: userDetails[0].id});
}
