'use client';
// import axiosInstance from '@/app/utils/intercerptor';
import EmailInput from '@/components/shared/Form-inputs/Email-Input';
import TextInput from '@/components/shared/Form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Form-inputs/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupComponent = () => {
	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'onChange'
	});

	const router = useRouter();

	const { isLoading, registering } = useRegister();
	const { errors, isSubmitting } = formState;

	async function onSubmit(data: any) {
		const { firstName, lastName, ...rest } = data;

		const payload = { name: firstName + ' ' + lastName, ...rest };

		registering(payload, { onSuccess: () => router.push('/dashboard') });
	}

	function onError(err: any) {
		console.log(err);
	}

	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<section className="flex flex-col min-h-screen items-center justify-center">
				<section className="bg-white dark:glass lg:my-5 w-5/6 md:w-4/6 lg:w-1/2 py-10 px-6 flex gap-6 flex-col items-center justify-center">
					<p className="text-center text-primary dark:text-label-color font-bold text-2xl">
						Sign Up
					</p>

					{/* <section className="flex flex-col gap-3 items-center justify-center w-full">
						<button className="btn flex gap-3 btn-primary">
							Google
						</button>

						<section className="text-primary dark:text-secondary">
							Or
						</section>
					</section> */}
					<form
						onSubmit={handleSubmit(onSubmit, onError)}
						className="w-full flex flex-col gap-2 items-center">
						<div className="w-full flex gap-4">
							<TextInput
								name={'firstName'}
								placeholder="Enter Password"
								label="First Name"
								type="password">
								<input
									{...register('firstName', {
										required: 'This field is required'
									})}
									className="input-style"
									type="text"
									id="firstName"
								/>
							</TextInput>
							<TextInput name={'lastName'} label="Last Name">
								<input
									{...register('lastName', {
										required: 'This field is required'
									})}
									className="input-style"
									type="text"
									id="firstName"
									placeholder="Enter Last Name"
								/>
							</TextInput>
						</div>
						<div className="w-full flex gap-4">
							<EmailInput name={'email'} label="Email">
								<input
									{...register('email', {
										required: 'This field is required'
									})}
									className="input-style"
									type="email"
									id="email"
								/>
							</EmailInput>

							<TextInput
								name={'password'}
								placeholder="Enter Password"
								label="Password">
								<div className="input-style !p-0 !pr-2 !overflow-hidden">
									<input
										className="w-full  dark:bg-transparent  border-none outline-none focus:ring-0 ring-0 "
										type={
											showPassword ? 'text' : 'password'
										}
										{...register('password', {
											required: 'This field is required'
										})}
										id="psw"
									/>

									{!showPassword ? (
										<FaEyeSlash
											className="text-primary cursor-pointer"
											onClick={togglePassword}
										/>
									) : (
										<FaEye
											className="text-primary cursor-pointer"
											onClick={togglePassword}
										/>
									)}
								</div>
							</TextInput>
						</div>

						<section className=" ">
							<ButtonComponent
								style="rounded-3xl 2xl:w-1/5"
								btnText="Submit"
								type="submit"
								loading={isLoading}
								disabled={!formState.isValid || isLoading}
								// afterIcon="/assets/send.svg"
							/>
						</section>
						<p className="text-sm text-primary dark:text-label-color flex gap-2">
							Already Have An Account ?
							<a className="text-blue-700 text-sm">Login</a>
						</p>
					</form>
				</section>
			</section>
		</>
	);
};

export default SignupComponent;
