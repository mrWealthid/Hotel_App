'use client';

import EmailInput from '@/components/shared/Form-inputs/Email-Input';
import TextInput from '@/components/shared/Form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Form-inputs/Button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axiosInstance from '@/app/utils/intercerptor';

const LoginComponent = () => {
	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'onChange',
		defaultValues: { email: 'admin@gmail.com', password: '12345678' }
	});

	const router = useRouter();
	const { isLoading, login } = useLogin();

	async function onSubmit(payload: any) {
		login(payload, { onSuccess: () => router.push('/dashboard') });
	}

	const { errors, isSubmitting } = formState;

	function onError(err: any) {
		console.log(err);
	}
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};
	return (
		<>
			<section className="flex flex-col min-h-screen h-fit items-center justify-center">
				<section className="bg-white dark:glass w-5/6 md:w-4/6 lg:w-1/3 py-10 px-5 flex gap-4 flex-col items-center justify-center">
					<p className="text-center text-primary dark:text-label-color font-bold text-2xl">
						Sign In to Get Started
					</p>
					{/*
					<section className="flex flex-col gap-3 items-center justify-center w-full">
						<button className="btn flex gap-3 btn-primary !w-5/6">
							Google
						</button>

						<section className="text-primary dark:text-secondary">
							Or
						</section>
					</section> */}

					<section className="w-full">
						<form
							onSubmit={handleSubmit(onSubmit, onError)}
							action=""
							className="w-full flex flex-col justify-center gap-2 items-center">
							<EmailInput name={'email'} label="Email">
								<input
									{...register('email', {
										required: 'This field is required'
									})}
									className="input-style"
									type="email"
									id="name"
								/>
							</EmailInput>
							<TextInput
								name={'password'}
								placeholder="Enter Password"
								label="Password">
								<div className="input-style !p-0 !pr-2 !overflow-hidden">
									<input
										className="w-full   border-none outline-none focus:ring-0 ring-0 "
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

							<section className=" ">
								<ButtonComponent
									style="rounded-3xl 2xl:w-1/5"
									btnText="Submit"
									loading={isLoading}
									type="submit"
									disabled={
										!formState.isValid || isSubmitting
									}
								/>
							</section>
							<p className="flex gap-3 text-sm text-primary dark:text-label-color">
								Forgot Password ?
								<small className="text-blue-600 cursor-pointer text-sm">
									Reset
								</small>
							</p>
							<p className="flex gap-3 text-sm text-primary dark:text-label-color">
								Need An Account ?
								<Link
									href={'/auth/signup'}
									className="text-blue-600 text-sm">
									Sign up
								</Link>
							</p>
						</form>
					</section>
				</section>
			</section>
		</>
	);
};

export default LoginComponent;
