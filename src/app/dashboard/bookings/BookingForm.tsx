'use client';

import TextInput from '@/components/shared/Form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Form-inputs/Button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoComplete from '@/components/shared/AutoComplete/AutoComplete';
import { fetchCabins, fetchGuests } from './service/bookings.service';
import { DateRangePicker } from '@/components/shared/DatePicker/DatePicker';
import {
	addDays,
	differenceInDays,
	formatISO,
	startOfDay,
	endOfDay,
	parseISO
} from 'date-fns';
import { formatCurrency } from '@/utils/helpers';
import { useCreateBooking } from './hooks/useBookings';

const BookingForm = ({ booking, onCloseModal, settings }: any) => {
	const isEditing = !!booking?.id;
	const [autoCompleteValue, setAutoCompleteValue] = useState<{
		guests: any;
		cabin: any;
	} | null>(null);

	const [startDate, setStartDate] = useState<any>(null);
	const [endDate, setEndDate] = useState<any>(null);

	const [breakfastPrice, setBreakfastPrice] = useState<any>(0);
	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'all',
		defaultValues: isEditing ? { ...booking } : {},
		values: {
			cabin: autoCompleteValue?.cabin?.id,
			guests: autoCompleteValue?.guests?.id,
			startDate: startDate,
			endDate: endDate
		}
	});

	const [hasBreakfast, setHasBreakFast] = useState(false);

	const { errors, isSubmitting } = formState;
	const { isCreating, createBooking } = useCreateBooking(
		booking?.id,
		isEditing,
		onCloseModal
	);

	function handleAutoCompleteValues(values: any) {
		setAutoCompleteValue({ ...autoCompleteValue, ...values });
	}

	function handleStartDate(date: any) {
		setStartDate(date);
	}
	function handleEndDate(date: any) {
		setEndDate(date);
	}

	useEffect(() => {
		setBreakfastPrice(calculateBreakfastPrice());
	}, [formState.isValid]);

	async function onSubmit(data: any) {
		const { cabin }: any = autoCompleteValue;
		const diffInDays = differenceInDays(
			new Date(endDate),
			new Date(startDate)
		);

		const dateObject_Start = new Date(startDate);
		const dateObject_End = new Date(endDate);

		const start_date = startOfDay(dateObject_Start);
		const end_date = endOfDay(dateObject_End);

		const payload = {
			...data,
			discount: cabin.discount,
			cabinPrice: cabin.regularPrice,
			startDate: formatISO(start_date),
			endDate: formatISO(end_date),
			numNights: diffInDays
		};

		console.log(payload);

		if (hasBreakfast) {
			payload.hasBreakfast = hasBreakfast;
			payload.extraPrice =
				settings.breakfastPrice *
				diffInDays *
				parseInt(getValues().numGuests);
		}

		createBooking(payload);
	}

	function onError(err: any) {
		console.log(err);
	}

	function addBreakfast(e: any) {
		setHasBreakFast(e.target.checked);
	}

	function calculateBreakfastPrice() {
		const diffInDays = differenceInDays(
			new Date(endDate),
			new Date(startDate)
		);

		return (
			parseInt(settings.breakfastPrice) *
			diffInDays *
			parseInt(getValues().numGuests)
		);
	}
	return (
		<div className="w-full">
			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				className=" flex flex-1  p-6   items-center">
				<section className="flex-col flex gap-2 w-full">
					<AutoComplete
						queryKey="guests"
						service={fetchGuests}
						label={'Guest'}
						displayValue={'name'}
						handler={handleAutoCompleteValues}
					/>

					<div className="hidden">
						<TextInput
							name={'guests'}
							error={errors?.['guests']?.message?.toString()}>
							<input
								title="cabin"
								{...register('guests', {
									required: 'This field is required'
								})}
								className="input-style"
								type="text"
								hidden
								readOnly
								id="guests"
							/>
						</TextInput>
					</div>
					<TextInput
						name={'numGuests'}
						placeholder="Enter Number Of Guests"
						label="Number Of Guest"
						error={errors?.['numGuests']?.message?.toString()}>
						<input
							{...register('numGuests', {
								required: 'This field is required',

								max: {
									value: settings.maxGuestsPerBooking,
									message: `Number of Guests must not be greater than five ${settings.maxGuestsPerBooking}`
								},
								min: {
									value: 1,
									message:
										'Number of Guests must be greater than one'
								}
							})}
							className="input-style"
							type="number"
							disabled={isSubmitting}
							id="numGuests"
						/>
					</TextInput>
					<AutoComplete
						queryKey="cabin"
						service={fetchCabins}
						label={'Cabin'}
						displayValue={'name'}
						handler={handleAutoCompleteValues}
					/>
					<div className="hidden">
						<TextInput
							name={'cabin'}
							error={errors?.['cabin']?.message?.toString()}>
							<input
								title="cabin"
								{...register('cabin', {
									required: 'This field is required'
								})}
								className="input-style"
								type="text"
								hidden
								readOnly
								id="cabin"
							/>
						</TextInput>
					</div>

					<section className="flex items-center gap-2">
						<TextInput
							name={'regularPrice'}
							placeholder="Enter regularPrice"
							label="Regular Price"
							error={errors?.[
								'regularPrice'
							]?.message?.toString()}>
							<input
								title="regularPrice"
								// {...register('regularPrice', {
								// 	required: 'This field is required'
								// })}
								value={
									autoCompleteValue?.cabin?.regularPrice || ''
								}
								readOnly
								className="input-style"
								type="text"
								id="regularPrice"
							/>
						</TextInput>
						<TextInput
							name={'discount'}
							placeholder="Enter discount"
							label="Discount"
							error={errors?.['discount']?.message?.toString()}>
							<input
								title="discount"
								// {...register('discount', {
								// 	required: 'This field is required'
								// })}
								value={autoCompleteValue?.cabin?.discount || ''}
								className="input-style"
								type="number"
								readOnly
								id="discount"
							/>
						</TextInput>
					</section>
					{/* <TextInput
						name={'discount'}
						placeholder="Enter Discount"
						label="Discount"
						type="number"
						error={errors?.['discount']?.message?.toString()}>
						<input
							{...register('discount', {
								required: 'This field is required',
								validate: (val) =>
									val <
										parseInt(
											autoCompleteValue?.cabin
												?.regularPrice
										) ||
									' regular price should be more than discount'
							})}
							disabled={isSubmitting}
							className="input-style"
							type="number"
							id="discount"
							defaultValue={0}
						/>
					</TextInput> */}

					<TextInput
						name={'observations'}
						placeholder="Enter observation"
						label="observation"
						error={errors?.['observations']?.message?.toString()}>
						<textarea
							className="input-style"
							{...register('observations', {
								required: 'This field is required'
							})}
							disabled={isSubmitting}
							id="observations"
							cols={40}
							rows={3}></textarea>
					</TextInput>

					<DateRangePicker
						labelText={'Duration'}
						startDate={startDate}
						endDate={endDate}
						handleStartDate={handleStartDate}
						handleEndDate={handleEndDate}
						// minStartDate={addDays(new Date(), 1)}
						// maxEndDate={
						// 	startDate
						// 		? addDays(startDate, settings.maxBookingLength)
						// 		: null
						// }
						minEndDate={
							startDate
								? addDays(startDate, settings.minBookingLength)
								: // ? addDays(startDate, settings.minBookingLength)
								  null
						}
					/>

					<div className="hidden">
						<TextInput name={'startDate'}>
							<input
								title="startDate"
								{...register('startDate', {
									required: 'This field is required'
								})}
								className="input-style"
								readOnly
								disabled={isSubmitting}
								id="startDate"
							/>
						</TextInput>
					</div>
					<div className="hidden">
						<TextInput name={'endDate'}>
							<input
								title="endDate"
								{...register('endDate', {
									required: 'This field is required'
								})}
								className="input-style"
								readOnly
								disabled={isSubmitting}
								id="endDate"
							/>
						</TextInput>
					</div>

					{formState.isValid && (
						<section className=" text-xs dark:text-white  items-center flex gap-2  mt-1">
							<input
								title="check"
								id="checkbox-all-search"
								type="checkbox"
								checked={hasBreakfast}
								onChange={addBreakfast}
								className="w-4 h-4 m-0 border-gray-300 rounded focus:ring-gray-500 "
							/>
							<label
								htmlFor="checkbox-all-search text-sm"
								className="sr-only">
								#
							</label>

							<span>
								Want to add breakfast
								<span>
									{' '}
									for{' '}
									{formState.isValid &&
										formatCurrency(breakfastPrice)}
									?
								</span>
							</span>
						</section>
					)}

					<section className="flex justify-end gap-4">
						<ButtonComponent
							type="reset"
							handleClick={() => onCloseModal?.()}
							style="rounded-3xl"
							btnText={'Cancel'}></ButtonComponent>

						<ButtonComponent
							type="submit"
							style="rounded-3xl"
							disabled={!formState.isValid || isSubmitting}
							loading={isCreating}
							btnText={` ${
								isEditing ? 'Update Booking' : ' Make Booking'
							}`}></ButtonComponent>
					</section>
				</section>
			</form>
		</div>
	);
};

export default BookingForm;
