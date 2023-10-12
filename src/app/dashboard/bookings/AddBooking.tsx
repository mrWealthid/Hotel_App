'use client';

import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Modal from '@/components/shared/Modal/Modal-component';

const AddBooking = () => {
	const [isOpen, setIsOpen] = useState(false);

	function handleToggle() {
		setIsOpen((prev) => !prev);
	}
	return (
		<Modal>
			<Modal.Open opens="Booking-form">
				<div>
					<button type="button" className="btn-primary rounded-3xl">
						Add New Booking
					</button>
				</div>
			</Modal.Open>
			<Modal.Window name="Booking-form">
				<BookingForm />
			</Modal.Window>
		</Modal>

		// <div>
		// 	<div className="flex justify-end ">
		// 		<ButtonComponent
		// 			type="button"
		// 			style="rounded-3xl  "
		// 			btnText={'Add New Booking'}
		// 			handleClick={handleToggle}></ButtonComponent>
		// 	</div>

		// 	{isOpen && <ModalComponent onClose={() => setIsOpen(false)} />}
		// </div>
	);
};

export default AddBooking;
