'use client';
import ButtonComponent from '@/components/shared/Button-component';
import ModalComponent from '@/components/shared/Modal-component';
import React, { useState } from 'react';

const AddCabin = () => {
	const [isOpen, setIsOpen] = useState(false);

	function handleToggle() {
		setIsOpen((prev) => !prev);
	}
	return (
		<div>
			<div className="flex justify-end ">
				<ButtonComponent
					type="button"
					style="rounded-3xl  "
					btnText={'Add New Cabin'}
					handleClick={handleToggle}></ButtonComponent>
			</div>

			{isOpen && <ModalComponent onClose={() => setIsOpen(false)} />}
		</div>
	);
};

export default AddCabin;
