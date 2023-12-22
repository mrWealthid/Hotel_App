'use client';

import TextInput from '@/components/shared/Form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Form-inputs/Button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoComplete from '@/components/shared/AutoComplete/AutoComplete';

import { useCreateGuest } from './hooks/useGuests';
import EmailInput from '@/components/shared/Form-inputs/Email-Input';

const GuestForm = ({ guest, onCloseModal }: any) => {
	const isEditing = !!guest?.id;
	const [autoCompleteValue, setAutoCompleteValue] = useState<{
		guests: any;
		cabin: any;
	} | null>(null);

	const { register, handleSubmit, formState } = useForm({
		mode: 'all',
		defaultValues: isEditing ? { ...guest } : {}
	});

	const { errors, isSubmitting } = formState;
	const { isCreating, createGuest } = useCreateGuest(
		guest?.id,
		isEditing,
		onCloseModal
	);

	// function handleAutoCompleteValues(values: any) {
	// 	setAutoCompleteValue({ ...autoCompleteValue, ...values });
	// }

	async function onSubmit(data: any) {
		// const { cabin }: any = autoCompleteValue;

		const payload = {
			...data
		};

		createGuest(payload);
	}

	function onError(err: any) {
		console.log(err);
	}

	return (
		<div className="w-full">
			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				className=" flex flex-1 p-1 sm:p-6   items-center">
				<section className="flex-col flex gap-2 w-full">
					<div className="">
						<TextInput
							name={'name'}
							label="Name"
							error={errors?.['name']?.message?.toString()}>
							<input
								title="name"
								{...register('name', {
									required: 'This field is required'
								})}
								className="input-style"
								type="text"
								hidden
								id="name"
							/>
						</TextInput>
					</div>
					<EmailInput
						name={'email'}
						label="Email"
						error={errors?.['email']?.message?.toString()}>
						<input
							{...register('email', {
								required: 'This field is required',
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
									message: 'Invalid email address'
								}
							})}
							className="input-style"
							type="email"
							id="name"
						/>
					</EmailInput>

					<div className="">
						<TextInput
							name={'nationality'}
							label="Nationality"
							error={errors?.[
								'nationality'
							]?.message?.toString()}>
							<input
								title="nationality"
								{...register('nationality', {
									required: 'This field is required'
								})}
								className="input-style"
								type="text"
								id="nationality"
							/>
						</TextInput>
					</div>
					<div className="">
						<TextInput
							name={'nationalId'}
							label="National Id"
							error={errors?.['nationalId']?.message?.toString()}>
							<input
								title="nationalId"
								{...register('nationalId', {
									required: 'This field is required'
								})}
								className="input-style"
								type="text"
								id="nationalId"
							/>
						</TextInput>
					</div>

					<section className="flex justify-end gap-4">
						<ButtonComponent
							type="reset"
							handleClick={() => onCloseModal?.()}
							styles="rounded-3xl"
							btnText={'Cancel'}></ButtonComponent>

						<ButtonComponent
							type="submit"
							styles="rounded-3xl"
							disabled={!formState.isValid || isSubmitting}
							loading={isCreating}
							btnText={` ${
								isEditing ? 'Update guest' : ' Add guest'
							}`}></ButtonComponent>
					</section>
				</section>
			</form>
		</div>
	);
};

export default GuestForm;
