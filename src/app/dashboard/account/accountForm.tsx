'use client';

import TextInput from '@/components/shared/Form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Form-inputs/Button';
import React from 'react';
import { useForm } from 'react-hook-form';
import EmailInput from '@/components/shared/Form-inputs/Email-Input';
import { useProfile } from '../profile/hooks/useProfile';
import PasswordForm from './PasswordForm';

const AccountForm = ({ stage, updateStage, data }: any) => {
	// const isEditing = !!cabin?.id;

	// const isEditing = true;

	// console.log(data);
	// console.log(isLoading);

	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'onChange',

		values: data
	});

	const { errors, isSubmitting } = formState;

	async function onSubmit(data: any) {
		console.log(data);
		stage === 0 && updateStage(stage + 1);
		// try {
		// 	const res = await fetch(`http://localhost:3000/api/user`, {
		// 		method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
		// 		body: JSON.stringify(data) // body data type must match "Content-Type" header
		// 	});

		// 	if (!res.ok) {
		// 		throw new Error(
		// 			`Cabin could not be created Status: ${res.status}`
		// 		);
		// 	}
		// 	stage === 0 && updateStage(stage + 1);
		// 	return res.json(); // parses JSON response into native JavaScript objects
		// } catch (err) {
		// 	console.log(err);
		// }
	}

	function onError(err: any) {
		console.log(err);
	}

	function onFileSelected(val: any) {
		console.log(val);
	}

	return (
		<>
			<section className="flex flex-col w-full lg:w-2/3 gap-7">
				<section className="card p-6 flex flex-col gap-4  w-full rounded-2xl ">
					<section className="flex justify-end">
						{/* <app-stepper [step]="profileService.step"
                     className="w-1/2"></app-stepper> */}
					</section>

					<section className="flex flex-col gap-5">
						<h2 className="lg:text-lg">Account Information</h2>
						{stage === 0 && (
							<form
								onSubmit={handleSubmit(onSubmit, onError)}
								className="flex flex-col gap-3">
								<div className="py-3 relative w-32 ">
									{/* <img  alt=""
                 className="  border dark:border-none rounded-full mx-auto w-32 object-cover  h-32" height="820"
                 src='{{data?.imgUrl}}' width="900"> */}

									{/* <img
										alt=""
										className="  border rounded-full mx-auto w-32 object-cover  h-32"
										height="820"
										src={''}
										width="900"
									/> */}

									<label htmlFor="photo">
										<i className="fa-solid absolute cursor-pointer bg-white text-green-900 border border-gray-200 rounded-full p-2 top-2 left-[90px] fa-arrow-up-from-bracket"></i>
									</label>

									<input
										onChange={(ev) => onFileSelected(ev)}
										accept="image/*"
										className="hidden"
										id="photo"
										title="photo"
										name="photo"
										type="file"
									/>
								</div>

								<EmailInput name={'email'} label="Email">
									<input
										{...register('email', {
											required: 'This field is required'
										})}
										className="input-style"
										disabled={true}
										type="email"
										id="email"
									/>
								</EmailInput>
								<TextInput
									name={'name'}
									placeholder="Enter Name"
									label="Name"
									error={errors?.[
										'name'
									]?.message?.toString()}>
									<input
										{...register('name', {
											required: 'This field is required'
										})}
										className="input-style"
										type="text"
										id="name"
									/>
								</TextInput>

								<div className="mt-2 flex gap-3 justify-end ">
									<ButtonComponent
										type="reset"
										handleClick={() => updateStage(0)}
										styles="rounded-3xl"
										btnText={'Cancel'}></ButtonComponent>

									<ButtonComponent
										type="submit"
										styles="rounded-3xl"
										disabled={!formState.isValid}
										btnText={
											'Update Profile'
										}></ButtonComponent>
								</div>
							</form>
						)}

						{stage === 1 && (
							<PasswordForm
								updateStage={updateStage}
								stage={stage}
							/>
						)}
					</section>
				</section>
			</section>
		</>
	);
};

export default AccountForm;
