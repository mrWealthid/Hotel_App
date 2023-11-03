import React from 'react';
import TodayItem from './TodayItem';

const TodayActivity = ({ daily }: any) => {
	console.log(daily);
	return (
		<div className=" flex flex-col gap-2">
			{daily?.map((activity: any) => (
				<TodayItem key={activity.id} {...activity} />
			))}
		</div>
	);
};

export default TodayActivity;
