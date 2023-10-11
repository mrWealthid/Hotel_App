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
import { useDeleteBooking, useCheckOutBooking } from '../hooks/useBookings';

const BookingsRowActions = ({ rowData }: any) => {
	console.log(rowData);
	const router = useRouter();

	const { isDeleting, deleteBooking } = useDeleteBooking();
	const { isCheckingOut, checkOutBooking } = useCheckOutBooking(rowData.id);
	// const { isDeleting, deleteBooking } = useDeleteBooking();
	// const { isDuplicating, duplicateCabin } = useDuplicateCabin();
	// async function handleDelete(id: any, close: any) {
	// 	try {
	// 		const res = await fetch(
	// 			`http://localhost:3000/api/cabins/${id}`,

	// 			{
	// 				method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
	// 				// body data type must match "Content-Type" header
	// 			}
	// 		);

	// 		if (!res.ok) {
	// 			throw new Error(
	// 				`Cabin could not be created Status: ${res.status}`
	// 			);
	// 		}

	// 		close();
	// 		toast.success('Cabin Deleted Successfully');

	// 		router.refresh();
	// 		return res.json(); // parses JSON response into native JavaScript objects
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	// async function handleCheckout(payload: any, close: any) {
	// 	try {
	// 		const res = await fetch(
	// 			`http://localhost:3000/api/bookings/${rowData.id}`,
	// 			{
	// 				method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
	// 				body: JSON.stringify(payload) // body data type must match "Content-Type" header
	// 			}
	// 		);

	// 		if (!res.ok) {
	// 			throw new Error(
	// 				`Guest could not be checked out Status: ${res.status}`
	// 			);
	// 		}

	// 		close();
	// 		toast.success('Checkout  Successful');

	// 		revalidateTag('bookings');
	// 		router.push('/dashboard/bookings');
	// 		return res.json(); // parses JSON response into native JavaScript objects
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }
	return (
		<td className="p-2 md:px-2 md:py-4 space-x-3">
			<Modal>
				<Dropdown
					arrowIcon={false}
					className="z-50 w-1/6 !text-black"
					style={{ color: 'black' }}
					label={<span>...</span>}>
					<Dropdown.Item as="div">
						{rowData.checkStatus === 'CHECKED_IN' && (
							<Modal.Open opens="check-out">
								<button type="button">Check-Out</button>
							</Modal.Open>
						)}
					</Dropdown.Item>
					<Dropdown.Item as="div">
						<Modal.Open opens="delete-booking">
							<button type="button">Delete</button>
						</Modal.Open>
					</Dropdown.Item>
					<Dropdown.Item as="div">
						<Link href={`bookings/${rowData.id}`}>
							View details
						</Link>
					</Dropdown.Item>
					{rowData.checkStatus === 'UNCONFIRMED' && (
						<Dropdown.Item as="div">
							<Link href={`checkin/${rowData.id}`}>Check-In</Link>
						</Dropdown.Item>
					)}
				</Dropdown>

				<Modal.Window name="delete-booking">
					<ConfirmationPage
						handler={(onCloseModal: any) => {
							deleteBooking(rowData.id);
							onCloseModal();
						}}
						modalText={'Are you sure you want to delete cabin'}
					/>
				</Modal.Window>

				<Modal.Window name="check-out">
					<ConfirmationPage
						handler={(onCloseModal: any) => {
							checkOutBooking({ checkStatus: 'CHECKED_OUT' });
							onCloseModal();
						}}
						modalText={`Are you sure you want to checkout
							 ${rowData.guests.name}`}
					/>
				</Modal.Window>
				{/* <Modal.Window name="confirm-duplicate">
					<ConfirmationPage
						handler={(onCloseModal: any) =>
							handleDuplicateCabin(rowData, onCloseModal)
						}
						modalText={'Are you sure you want to duplicate cabin'}
					/>
				</Modal.Window> */}
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
