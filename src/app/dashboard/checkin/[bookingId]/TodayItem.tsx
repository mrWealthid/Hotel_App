import React from 'react';

const TodayItem = ({ checkStatus }: any) => {
	return <div className="flex gap-2  ">


<p className={`${checkStatus ==='CHECKED_IN' ? 'bg-success':''}`}>{checkStatus}</p>


        </div>;
};

export default TodayItem;
