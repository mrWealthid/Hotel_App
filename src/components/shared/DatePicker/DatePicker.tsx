import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Label from '../Form-inputs/Label';
import { addDays } from 'date-fns';

export const DateRangePicker = ({
	startDate,
	endDate,
	handleStartDate,
	handleEndDate,
	labelText,
	maxEndDate = null,
	minEndDate = startDate,
	minStartDate = null,
	maxStartDate = null
}: any) => {
	// const [startDate, setStartDate] = useState(null);
	// const [endDate, setEndDate] = useState(null);

	return (
		<>
			<Label name={labelText} text={labelText} />
			<section className="flex -mt-2 gap-2 w-full">
				<DatePicker
					selected={startDate}
					onChange={(date: any) => {
						handleStartDate(date);
						handleEndDate(null); //This will reset end date when state date changes
					}}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					minDate={minStartDate}
					isClearable={true}
					placeholderText="Start Date"
					className="input-style"
					required
				/>
				<DatePicker
					selected={endDate}
					onChange={(date: any) => handleEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={minEndDate}
					isClearable={true}
					maxDate={maxEndDate}
					className="input-style"
					placeholderText="End Date"
					required
				/>
			</section>
		</>
	);
};
