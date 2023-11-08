import Link from 'next/link';
import React from 'react';
import { useCheckOutBooking } from '../../hooks/useDashboard';

const TodayItem = ({ checkStatus, guests, cabin, _id, numNights }: any) => {
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
					<button
						type="button"
						onClick={() =>
							checkOutBooking({ checkStatus: 'CHECKED_OUT' })
						}
						className=" bg-primary disabled:bg-primary-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-3xl">
						Check-Out
					</button>
				</div>
			)}
		</div>
	);
};

export default TodayItem;
