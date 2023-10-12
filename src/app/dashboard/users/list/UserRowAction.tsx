import Modal from '@/components/shared/Modal/Modal-component';
import { Dropdown } from 'flowbite-react';
import React from 'react';
import CabinForm from '../../cabins/CabinForm';

const UserRowAction = () => {
	return (
		<td className="p-2 md:px-2 md:py-2 space-x-3">
			{/* <button onClick={() => mutate(rowData.id)}>Test</button> */}
			<Modal>
				<Dropdown
					arrowIcon={false}
					className="z-50 w-1/6 !text-black"
					style={{ color: 'black' }}
					label={<span>...</span>}>
					<Dropdown.Item as="div">
						<Modal.Open opens="edit-cabin-form">
							<button type="button">Edit</button>
						</Modal.Open>
					</Dropdown.Item>
					<Dropdown.Item as="div">
						<Modal.Open opens="confirm-modal">
							<button type="button">Delete</button>
						</Modal.Open>
					</Dropdown.Item>
				</Dropdown>

				<Modal.Window name="edit-cabin-form">
					<CabinForm />
				</Modal.Window>

				{/* <Modal.Window name="confirm-modal">
					<ConfirmationPage
						handler={(onCloseModal: any) => {
							// handleDelete(rowData.id, onCloseModal)
							deleteCabin(rowData.id);
							onCloseModal();
						}}
						modalText={'Are you sure you want to delete cabin'}
					/>
				</Modal.Window>
				<Modal.Window name="confirm-duplicate">
					<ConfirmationPage
						handler={(onCloseModal: any) => {
							duplicateCabin(rowData);
							onCloseModal();
						}}
						modalText={'Are you sure you want to duplicate cabin'}
					/>
				</Modal.Window> */}
			</Modal>
		</td>
	);
};

export default UserRowAction;
