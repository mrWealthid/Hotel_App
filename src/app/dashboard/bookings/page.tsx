import React, { useState } from 'react';
import BookingList from './list/BookingList';

import AddBooking from './AddBooking';

const Page = () => {
	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				<h1 className="title"> All Bookings </h1>

				<AddBooking />
			</div>

			{/* <CabinForm /> */}
			<BookingList />
		</div>
	);
};

export default Page;
