'use client';

import TextInput from '@/components/form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Button-component';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CabinForm = () => {
	const [show, setShow] = useState(false);

	const { register, handleSubmit, getValues, formState } = useForm();

	const { errors, isSubmitting } = formState;

	function handleToggle() {
		setShow((prev) => !prev);
	}

	async function onSubmit(data: any) {
		try {
			const res = await fetch('http://localhost:3000/api/cabins', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				body: JSON.stringify(data) // body data type must match "Content-Type" header
			});

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
		<div>
			<div className="flex justify-end ">
				<ButtonComponent
					type="button"
					style="rounded-3xl  "
					btnText={'Add New Cabin'}
					handleClick={handleToggle}></ButtonComponent>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				className=" flex flex-1  p-6 bg-white w-2/3   items-center">
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
							disabled={isSubmitting}
							className="input-style"
							type="text"
							id="name"
						/>
					</TextInput>

					<TextInput
						name={'maxCapacity'}
						placeholder="Enter MaxCapacity"
						label="Max Capacity"
						error={errors.name?.message?.toString()}>
						<input
							{...register('maxCapacity', {
								required: 'This field is required'
							})}
							className="input-style"
							type="text"
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
									val < getValues().regularPrice ||
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
							cols={30}
							rows={10}></textarea>
					</TextInput>
					{/* <label htmlFor="photo">Photo</label>
					<p>Image Upload</p> */}

					<section className="flex justify-end gap-4">
						<ButtonComponent
							type="reset"
							style="rounded-3xl"
							btnText={'Cancel'}></ButtonComponent>

						<ButtonComponent
							type="submit"
							style="rounded-3xl"
							disabled={!formState.isValid}
							btnText={'Add  Cabin'}></ButtonComponent>
					</section>
				</section>
			</form>
		</div>
	);
};

export default CabinForm;
