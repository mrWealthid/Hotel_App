'use client';
import React, { cloneElement, use, useContext, useState } from 'react';
import { Dropdown } from 'flowbite-react';

import Link from 'next/link';
import Modal from '@/components/shared/Modal-component';
import CabinForm from '../BookingForm';
import ConfirmationPage from '../../../../components/ui/ConfirmationPage';
import toast from 'react-hot-toast';
import { DropdownHeader } from 'flowbite-react/lib/esm/components/Dropdown/DropdownHeader';
import { revalidatePath, revalidateTag } from 'next/cache';
import { useRouter } from 'next/navigation';

const BookingsRowActions = ({ rowData }: any) => {
	const router = useRouter();
	async function handleDelete(id: any, close: any) {
		try {
			const res = await fetch(
				`http://localhost:3000/api/cabins/${id}`,

				{
					method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
					// body data type must match "Content-Type" header
				}
			);

			if (!res.ok) {
				throw new Error(
					`Cabin could not be created Status: ${res.status}`
				);
			}

			close();
			toast.success('Cabin Deleted Successfully');

			router.refresh();
			return res.json(); // parses JSON response into native JavaScript objects
		} catch (err) {
			console.log(err);
		}
	}

	async function handleDuplicateCabin(rowData: any, close: any) {
		const { _id, id, ...rest } = rowData;

		try {
			const res = await fetch(
				`http://localhost:3000/api/cabins`,

				{
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					body: JSON.stringify(rest) // body data type must match "Content-Type" header
				}
			);

			if (!res.ok) {
				throw new Error(
					`Cabin could not be created Status: ${res.status}`
				);
			}

			close();
			toast.success('Cabin Duplicated Successfully');

			router.refresh();
			return res.json(); // parses JSON response into native JavaScript objects
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<td className="p-2 md:px-2 md:py-4 space-x-3">
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
					<Dropdown.Item as="div">
						<Modal.Open opens="confirm-duplicate">
							<button type="button">Duplicate</button>
						</Modal.Open>
					</Dropdown.Item>
				</Dropdown>

				<Modal.Window name="edit-cabin-form">
					<CabinForm cabin={rowData} />
				</Modal.Window>

				<Modal.Window name="confirm-modal">
					<ConfirmationPage
						handler={(onCloseModal: any) =>
							handleDelete(rowData.id, onCloseModal)
						}
						modalText={'Are you sure you want to delete cabin'}
					/>
				</Modal.Window>
				<Modal.Window name="confirm-duplicate">
					<ConfirmationPage
						handler={(onCloseModal: any) =>
							handleDuplicateCabin(rowData, onCloseModal)
						}
						modalText={'Are you sure you want to duplicate cabin'}
					/>
				</Modal.Window>
			</Modal>
			{/* <Modal>
				<Modal.Open opens="edit-cabin-form">
					<button type="button" className="btn-primary rounded-3xl">
						Edit
					</button>
				</Modal.Open>
				<Modal.Window name="edit-cabin-form">
					<CabinForm cabin={rowData} />
				</Modal.Window>
			</Modal> */}

			{/* <Modal>
				<Modal.Open opens="confirm-modal">
					<div>
						<button
							type="button"
							className="btn-primary rounded-3xl">
							Delete
						</button>
					</div>
				</Modal.Open>
				<Modal.Window name="confirm-modal">
					<ConfirmationPage
						handler={() => handleDelete(rowData.id)}
						modalText={'Are you sure you want to delete cabin'}
					/>
				</Modal.Window>
			</Modal> */}

			{/* <button
				onClick={() => handleDelete(rowData.id)}
				className="text-xs popup">
				Delete
			</button>

			<button
				onClick={() => handleDuplicateCabin(rowData)}
				className="text-xs popup">
				Duplicate
			</button> */}
		</td>
	);
};

export default BookingsRowActions;
