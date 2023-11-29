import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
connect();

export async function GET(request: NextRequest, { params }: any) {
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
