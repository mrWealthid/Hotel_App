import React, { useState } from 'react';
import BookingList from './list/BookingList';

import AddBooking from './AddBooking';
import { getData } from '@/utils/apiRequests';

const Page = async () => {
	const settings = await getData('api/settings', 'settings');
	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<h1 className="title"> All Bookings </h1>

				<AddBooking settings={settings.data} />
			</div>

			{/* <CabinForm /> */}
			<BookingList />
		</div>
	);
};

export default Page;
