import { NextRequest, NextResponse } from 'next/server';
import { mapToObject } from '../utils/helpers';
import Cabin from '@/model/cabinModel';

export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		const query: any = request.nextUrl.searchParams;

		const transformedQuery = mapToObject(query);

		console.log('Search Params', transformedQuery);

		// const guests = await Guest.find();

		const regex = new RegExp(transformedQuery.name, 'i'); // 'i' for case-insensitive
		const results = await Cabin.find({ name: { $regex: regex } });

		const response = NextResponse.json({
			status: 'success',
			data: results
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
