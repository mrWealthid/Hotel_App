'use client';

import TextInput from '@/components/shared/Form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Form-inputs/Button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoComplete from '@/components/shared/AutoComplete/AutoComplete';
import { fetchCabins, fetchGuests } from './service/bookings.service';

const BookingForm = ({ booking, onCloseModal, settings }: any) => {
	const isEditing = !!booking?.id;

	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'onChange',
		defaultValues: isEditing ? { ...booking } : {}
	});

	const [autoCompleteValue, setAutoCompleteValue] = useState<{
		guests: any;
		cabin: any;
	} | null>(null);

	const { errors, isSubmitting } = formState;

	function handleAutoCompleteValues(values: any) {
		setAutoCompleteValue({ ...autoCompleteValue, ...values });
	}

	async function onSubmit(data: any) {
		const { guests, cabin }: any = autoCompleteValue;

		const payload = {
			...data,
			guests: guests.id,
			cabin: cabin.id,
			regularPrice: cabin.regularPrice
		};

		console.log(payload);
		try {
			const res = await fetch(
				`${
					isEditing
						? `http://localhost:3000/api/bookings/${booking.id}`
						: `http://localhost:3000/api/bookings`
				}`,
				{
					method: `${isEditing ? 'PATCH' : 'POST'}`, // *GET, POST, PUT, DELETE, etc.
					body: JSON.stringify(payload) // body data type must match "Content-Type" header
				}
			);

			if (!res.ok) {
				throw new Error(
					`Cabin could not be created Status: ${res.status}`
				);
			}
			return res.json(); // parses JSON response into native JavaScript objects
		} catch (err) {
			console.log(err);
		}
	}

	function onError(err: any) {
		console.log(err);
	}
	return (
		<div className="w-full">
			{/* <div className="flex justify-end ">
				<ButtonComponent
					type="button"
					style="rounded-3xl  "
					btnText={'Add New Cabin'}
					handleClick={handleToggle}></ButtonComponent>
			</div> */}

			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				className=" flex flex-1  p-6 bg-white   items-center">
				<section className="flex-col flex gap-2 w-full">
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
						queryKey="guests"
						service={fetchGuests}
						label={'Guest'}
						displayValue={'name'}
						handler={handleAutoCompleteValues}
					/>
					<AutoComplete
						queryKey="cabin"
						service={fetchCabins}
						label={'Cabin'}
						displayValue={'name'}
						handler={handleAutoCompleteValues}
					/>

					<TextInput
						name={'regularPrice'}
						placeholder="Enter regularPrice"
						label="Regular Price"
						error={errors?.['regularPrice']?.message?.toString()}>
						<input
							title="regularPrice"
							value={autoCompleteValue?.cabin?.regularPrice}
							className="input-style"
							type="text"
							readOnly
							disabled={isSubmitting}
							id="regularPrice"
						/>
					</TextInput>

					{/* <span>{autoCompleteValue?.cabin?.regularPrice}</span> */}
					<TextInput
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
					</TextInput>

					<TextInput
						name={'observation'}
						placeholder="Enter observation"
						label="observation"
						error={errors?.['observation']?.message?.toString()}>
						<textarea
							className="input-style"
							{...register('observation', {
								required: 'This field is required'
							})}
							disabled={isSubmitting}
							id="observation"
							cols={40}
							rows={3}></textarea>
					</TextInput>

					{/* <label htmlFor="photo">Photo</label>
					<p>Image Upload</p> */}

					<section className="flex justify-end gap-4">
						<ButtonComponent
							type="reset"
							handleClick={() => onCloseModal?.()}
							style="rounded-3xl"
							btnText={'Cancel'}></ButtonComponent>

						<ButtonComponent
							type="submit"
							style="rounded-3xl"
							disabled={!formState.isValid}
							btnText={` ${
								isEditing ? 'Update Cabin' : ' Add  Cabin'
							}`}></ButtonComponent>
					</section>
				</section>
			</form>
		</div>
	);
};

export default BookingForm;
