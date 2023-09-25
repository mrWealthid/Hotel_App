import { connect } from '@/dbConfig/dbConfig';
import Cabin from '@/model/cabinModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest, { params }: any) {
	try {
		//2) Check if user exists & password is correct after it's hashed

		let cookie = request.cookies.get('token')?.value || '';
		// console.log(jwtVerifyPromisified('cookie'));

		const cabinId = params.cabinId;

		// console.log(getUserDetails(cookie));

		// const userId = getUserDetails(cookie);

		// const method = request.method;
		// console.log(method);

		// const body = await request.json();
		console.log(cabinId);

		const cabin = await Cabin.findOne({ _id: cabinId });

		//   const doc = await Model.create(req.body);
		// const user = await User.findOne({ _id: userId });

		const response = NextResponse.json({
			status: 'success',
			data: cabin
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PATCH(request: NextRequest, { params }: any) {
	const body = await request.json();

	try {
		const cabinId = params.cabinId;

		const updatedCabin = await Cabin.findByIdAndUpdate(cabinId, body, {
			new: true,
			runValidators: true
		});

		if (!updatedCabin) {
			return NextResponse.json(
				{ error: 'No cabin found with ID' },
				{ status: 404 }
			);
		}
		const response = NextResponse.json({
			message: 'Cabin Updated Successfully',
			success: true,
			data: updatedCabin
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
export async function DELETE(request: NextRequest, { params }: any) {
	const body = await request.json();

	try {
		const cabinId = params.cabinId;

		const cabin = await Cabin.findByIdAndUpdate(cabinId, body, {
			new: true,
			runValidators: true
		});

		if (!cabin) {
			return NextResponse.json(
				{ error: 'No cabin found with ID' },
				{ status: 404 }
			);
		}
		const response = NextResponse.json({
			message: 'Cabin Deleted  Successfully',
			success: true
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// export async function GET(request: NextRequest) {
// 	try {
// 		//2) Check if user exists & password is correct after it's hashed

// 		let cookie = request.cookies.get('token')?.value || '';
// 		// console.log(jwtVerifyPromisified('cookie'));

// 		// console.log(getUserDetails(cookie));

// 		// const userId = getUserDetails(cookie);

// 		// const method = request.method;
// 		// console.log(method);

// 		// const body = await request.json();

// 		const cabin = await Cabin.find();

// 		//   const doc = await Model.create(req.body);
// 		// const user = await User.findOne({ _id: userId });

// 		const response = NextResponse.json({
// 			status: 'success',
// 			data: cabin
// 		});

// 		return response;
// 	} catch (error: any) {
// 		return NextResponse.json({ error: error.message }, { status: 500 });
// 	}
// }
