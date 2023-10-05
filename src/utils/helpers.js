export const convertTime = (time) => {
	const options = {
		hour: 'numeric',
		minute: 'numeric'
	};
	const locale = navigator.language;

	return Intl.DateTimeFormat(locale, options).format(new Date(time));
};

//to get days passed
export const calcDaysPassed = (date1, date2) =>
	Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

//to get hours passed
export const calcHoursPassed = (date1, date2) =>
	Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60));

//to get mins passed
export const calcMinsPassed = (date1, date2) =>
	Math.round(Math.abs(date2 - date1) / (1000 * 60));

// console.log(calcDaysPassed(new Date(2021, 11, 14), new Date(2021, 11, 12)));

export const formatDate = (date) => {
	const daysPassed = calcDaysPassed(new Date(), new Date(date));

	const WeeksPassed = Math.round(
		calcDaysPassed(new Date(), new Date(date)) / 7
	);
	const locale = navigator.language;
	if (daysPassed === 0) return 'Today';
	if (daysPassed === 1) return 'Yesterday';
	if (daysPassed <= 7) return `${daysPassed} days ago`;
	if (daysPassed <= 7) return `${daysPassed} days ago`;
	if (WeeksPassed === 1) return `${WeeksPassed} week ago`;
	if (WeeksPassed > 1) return `${WeeksPassed} weeks ago`;
	const TodaysDate = new Intl.DateTimeFormat(locale).format(new Date(date));
	return TodaysDate;
};

export function getStatusColor(val) {
	let style = '';
	if (val === 'UNCONFIRMED') {
		style = 'bg-pending text-white';
	}

	if (val === 'CHECKED_OUT') {
		style = 'bg-gray-300';
	}

	if (val === 'CHECKED_IN') {
		style = 'bg-success text-white';
	}
	return style;
}

export const formatCurrency = (value, currency = 'USD', locale = 'en') => {
	const options = {
		style: 'currency',
		currency
	};

	return new Intl.NumberFormat(locale, options).format(Math.abs(value));
};
