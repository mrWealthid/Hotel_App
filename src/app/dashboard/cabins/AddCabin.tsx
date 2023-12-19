'use client';

import React from 'react';
import CabinForm from './CabinForm';
import Modal from '@/components/shared/Modal/Modal-component';
import { CiCirclePlus } from 'react-icons/ci';

const AddCabin = () => {
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<div>
					<button
						type="button"
						className="btn-primary flex items-center gap-1 rounded-3xl">
						<CiCirclePlus size={18} /> Add New Cabin
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
