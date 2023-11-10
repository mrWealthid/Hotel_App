import React from 'react';
import TodayItem from './TodayItem';

const TodayActivity = ({ daily }: any) => {
	console.log(daily);

	if (daily?.length < 1) {
		return (
			<p className="  text-xs   dark:glass p-3 dark:rounded   items-center  ">
				No Data Available
			</p>
		);
	}
	return (
		<div className=" flex flex-col gap-2">
			{daily?.map((activity: any) => (
				<TodayItem key={activity.id} {...activity} />
			))}
		</div>
	);
};

export default TodayActivity;
