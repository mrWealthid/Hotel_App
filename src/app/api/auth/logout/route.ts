import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	try {
		cookies().delete('token');
		const response = NextResponse.json({
			status: 'success',
			message: 'User was logged out'
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
