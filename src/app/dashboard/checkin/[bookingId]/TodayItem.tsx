import Link from 'next/link';
import React from 'react';
import { useCheckOutBooking } from '../../hooks/useDashboard';
import Modal from '@/components/shared/Modal/Modal-component';
import ConfirmationPage from '@/components/ui/ConfirmationPage';

const TodayItem = ({ checkStatus, guests, _id, numNights }: any) => {
	const { isCheckingOut, checkOutBooking } = useCheckOutBooking(_id);
	return (
		<div className="flex  text-xs justify-between  border-b dark:border-none dark:glass dark:p-1 dark:rounded   items-center pb-2 border-gray-50 ">
			<p
				className={`${
					checkStatus === 'CHECKED_IN'
						? 'bg-green-300 text-green-800'
						: 'bg-blue-400 text-blue-800'
				}  rounded-3xl  py-1 px-2`}>
				{checkStatus === 'CHECKED_IN' ? 'Departing' : 'Arriving'}
			</p>

			<p>{guests?.name}</p>

			<p>{numNights} night(s)</p>

			{checkStatus === 'UNCONFIRMED' && (
				<div>
					<button
						type="button"
						className=" bg-primary disabled:bg-primary-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-3xl">
						<Link href={`/dashboard/checkin/${_id}`}>Check-In</Link>
					</button>
				</div>
			)}
			{checkStatus === 'CHECKED_IN' && (
				<div>
					<Modal>
						<Modal.Open opens="check-out">
							<button className=" bg-primary disabled:bg-primary-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-3xl">
								Check-Out
							</button>
						</Modal.Open>

						<Modal.Window name="check-out">
							<ConfirmationPage
								handler={(onCloseModal: any) => {
									checkOutBooking({
										checkStatus: 'CHECKED_OUT'
									});
									onCloseModal();
								}}
								modalText={`Are you sure you want to checkout
							 ${guests.name}`}
							/>
						</Modal.Window>
					</Modal>
				</div>
			)}
		</div>
	);
};

export default TodayItem;
