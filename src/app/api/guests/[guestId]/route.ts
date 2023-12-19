import Guest from '@/model/guestModel';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: any) {
	const body = await request.json();

	try {
		const guestId = params.guestId;

		const updatedguest = await Guest.findByIdAndUpdate(guestId, body, {
			new: true,
			runValidators: true
		});

		if (!updatedguest) {
			return NextResponse.json(
				{ error: 'No guest found with ID' },
				{ status: 404 }
			);
		}
		const response = NextResponse.json({
			message: 'guest Updated Successfully',
			success: true,
			data: updatedguest
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
export async function DELETE(request: NextRequest, { params }: any) {
	try {
		const guestId = params.guestId;

		const guest = await Guest.findByIdAndDelete(guestId);

		if (!guest) {
			return NextResponse.json(
				{ error: 'No guest found with ID' },
				{ status: 404 }
			);
		}
		const response = NextResponse.json({
			message: 'guest Deleted  Successfully',
			success: true
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
