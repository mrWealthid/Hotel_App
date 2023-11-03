import React from 'react';
import TodayItem from './TodayItem';

const TodayActivity = () => {
	const daily: [] = [];
	return (
		<div>
			TodayActivity
			{daily.map((activity: any) => (
				<TodayItem key={activity.id} />
			))}
		</div>
	);
};

export default TodayActivity;
