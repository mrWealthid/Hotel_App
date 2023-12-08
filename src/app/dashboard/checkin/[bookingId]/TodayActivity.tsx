import React, { useState } from 'react';
import TodayItem from './TodayItem';
import ReceiptPopup from '@/components/shared/Modal/ReceiptPopup';

const TodayActivity = ({ daily }: any) => {
	const [show, setShow] = useState(false);
	const [activity, setActivity] = useState(null);

	function handlePopup() {
		setShow(true);
	}

	function renderBookings() {
		if (daily?.length < 1) {
			return (
				<p className="  text-xs   dark:glass p-3 dark:rounded   items-center  ">
					No Data Available
				</p>
			);
		}
		if (daily?.length >= 1) {
			return daily?.map((activity: any) => (
				<TodayItem
					handlePopup={handlePopup}
					processActivity={setActivity}
					key={activity._id}
					activity={activity}
					{...activity}
				/>
			));
		}
	}

	return (
		<div className=" flex flex-col gap-2">
			{renderBookings()}

			{show && <ReceiptPopup activity={activity} />}
		</div>
	);
};

export default TodayActivity;
