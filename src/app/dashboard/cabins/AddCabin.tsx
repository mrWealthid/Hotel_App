'use client';
import ButtonComponent from '@/components/shared/Button-component';
import ModalComponent from '@/components/shared/Modal-component';
import Cabin from '@/model/cabinModel';
import React, { useState } from 'react';
import CabinForm from './CabinForm';
import Modal from '@/components/shared/Modal-component';
import CabinList from './list/CabinList';

const AddCabin = () => {
	const [isOpen, setIsOpen] = useState(false);

	function handleToggle() {
		setIsOpen((prev) => !prev);
	}
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<div>
					<button type="button" className="btn-primary rounded-3xl">
						Add New Cabin
					</button>
				</div>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CabinForm />
			</Modal.Window>
		</Modal>

		// <div>
		// 	<div className="flex justify-end ">
		// 		<ButtonComponent
		// 			type="button"
		// 			style="rounded-3xl  "
		// 			btnText={'Add New Cabin'}
		// 			handleClick={handleToggle}></ButtonComponent>
		// 	</div>

		// 	{isOpen && <ModalComponent onClose={() => setIsOpen(false)} />}
		// </div>
	);
};

export default AddCabin;
