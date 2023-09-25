import { connect } from '@/dbConfig/dbConfig';
import Settings from '@/model/settingsModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest, { params }: any) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		const settings = await Settings.find();

		const response = NextResponse.json({
			status: 'success',
			data: settings[0]
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const settings = await Settings.create(body);

		const response = NextResponse.json({
			status: 'success',
			data: settings
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
