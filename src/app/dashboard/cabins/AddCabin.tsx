'use client';

import React from 'react';
import CabinForm from './CabinForm';
import Modal from '@/components/shared/Modal/Modal-component';

const AddCabin = () => {
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
	);
};

export default AddCabin;
