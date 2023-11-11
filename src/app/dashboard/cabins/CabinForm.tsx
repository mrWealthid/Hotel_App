'use client';

import TextInput from '@/components/shared/Form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Form-inputs/Button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCabin } from './hooks/useCabins';

const CabinForm = ({ cabin, onCloseModal }: any) => {
	const isEditing = !!cabin?.id;

	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'onChange',
		defaultValues: isEditing ? { ...cabin } : {}
	});
	const { isCreating, createCabin } = useCreateCabin(
		cabin?.id,
		isEditing,
		onCloseModal
	);

	const { errors, isSubmitting } = formState;

	async function onSubmit(data: any) {
		createCabin(data);
	}

	function onError(err: any) {
		console.log(err);
	}
	return (
		<div className="w-full">
			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				className=" flex flex-1  p-6   items-center">
				<section className="flex-col flex gap-2 w-full">
					<TextInput
						name={'name'}
						placeholder="Enter Cabin"
						label="Cabin Name"
						error={errors?.['name']?.message?.toString()}>
						<input
							{...register('name', {
								required: 'This field is required'
							})}
							className="input-style"
							type="text"
							id="name"
						/>
					</TextInput>

					<TextInput
						name={'maxCapacity'}
						placeholder="Enter MaxCapacity"
						label="Max Capacity"
						error={errors?.['maxCapacity']?.message?.toString()}>
						<input
							{...register('maxCapacity', {
								required: 'This field is required',

								max: {
									value: 5,
									message:
										'Max capacity must not be greater than five'
								},
								min: {
									value: 1,
									message:
										'Max capacity must be greater than one'
								}
							})}
							className="input-style"
							type="number"
							disabled={isSubmitting}
							id="maxCapacity"
						/>
					</TextInput>
					<TextInput
						name={'regularPrice'}
						placeholder="Enter regularPrice"
						label="Regular Price"
						error={errors?.['regularPrice']?.message?.toString()}>
						<input
							{...register('regularPrice', {
								required: 'This field is required'
							})}
							className="input-style"
							type="text"
							disabled={isSubmitting}
							id="regularPrice"
						/>
					</TextInput>

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
									val < parseInt(getValues().regularPrice) ||
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
						name={'description'}
						placeholder="Enter Description"
						label="Description"
						error={errors?.['description']?.message?.toString()}>
						<textarea
							className="input-style"
							{...register('description', {
								required: 'This field is required'
							})}
							disabled={isSubmitting}
							id="description"
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

export default CabinForm;
