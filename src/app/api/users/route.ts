import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';

import jwt, { VerifyErrors, verify } from 'jsonwebtoken';
import APIFeatures from '../utils/apiFeatures';
import { mapToObject } from '../utils/helpers';

connect();

export async function GET(request: NextRequest) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		// console.log(getUserDetails(cookie));

		// const userId = getUserDetails(cookie);

		let filter = {};
		const query: any = request.nextUrl.searchParams;
		const transformedQuery = mapToObject(query);

		const features = new APIFeatures(User.find(filter), transformedQuery)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const users = await features.query;

		let count;

		// console.log( await Model.find(req.query))

		//I did this because pagination of filtered data was impossible, The endpoint keeps returning the total count of all document
		console.log('Query', Object.values(transformedQuery).length);
		if (Object.values(transformedQuery).length > 0) {
			const excludedFields = ['page', 'sort', 'limit', 'fields'];
			excludedFields.forEach((el) => delete transformedQuery[el]);
			count = await User.find(filter).find(transformedQuery).count();
		} else {
			count = await User.count(filter);
		}

		// const user = await User.findOne({ _id: userId });

		const response = NextResponse.json({
			status: 'success',
			totalRecords: count,
			results: users.length,
			data: users
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

function getUserDetails(token: string) {
	try {
		const decodedToken: any = verify(token, process.env.JWT_SECRET!);
		console.log(decodedToken);
		console.log('I got here');
		return decodedToken.id;
	} catch (err: any) {
		// console.log('My error', err);
		throw new Error(err.message);
	}
}
