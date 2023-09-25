import Setting from '@/model/settingsModel';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: any) {
	const body = await request.json();

	try {
		const settingsId = params.settingsId;

		const updatedSettings = await Setting.findByIdAndUpdate(
			settingsId,
			body,
			{
				new: true,
				runValidators: true
			}
		);

		if (!updatedSettings) {
			return NextResponse.json(
				{ error: 'No cabin found with ID' },
				{ status: 404 }
			);
		}
		const response = NextResponse.json({
			message: 'Cabin Settings Updated Successfully',
			success: true,
			data: updatedSettings
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
