'use client';

import EmailInput from '@/components/shared/Form-inputs/Email-Input';
import TextInput from '@/components/shared/Form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Form-inputs/Button-component';
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import axiosInstance from '@/app/utils/intercerptor';

const loginComponent = () => {
	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'onChange'
	});

	const router = useRouter();

	async function onSubmit(data: any) {
		try {
			const res = await fetch(`http://localhost:3000/api/auth/login`, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				body: JSON.stringify(data) // body data type must match "Content-Type" header
			});

			if (!res.ok) {
				throw new Error(
					`Cabin could not be created Status: ${res.status}`
				);
			}

			router.push('/dashboard');

			return res.json(); // parses JSON response into native JavaScript objects
		} catch (err) {
			console.log(err);
		}
	}

	const { errors, isSubmitting } = formState;

	function onError(err: any) {
		console.log(err);
	}
	return (
		<>
			<section className="flex flex-col min-h-screen h-fit items-center justify-center">
				<section className="bg-white dark:glass w-5/6 md:w-4/6 lg:w-1/3 py-10 px-5 flex gap-4 flex-col items-center justify-center">
					<p className="text-center text-primary dark:text-label-color font-bold text-2xl">
						Sign In to Get Started
					</p>

					<section className="flex flex-col gap-3 items-center justify-center w-full">
						<button className="btn flex gap-3 btn-primary !w-5/6">
							Google
						</button>

						<section className="text-primary dark:text-secondary">
							Or
						</section>
					</section>

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
								label="Password"
								type="password">
								<input
									{...register('password', {
										required: 'This field is required'
									})}
									className="input-style"
									type="password"
									id="name"
								/>
							</TextInput>

							<section className=" ">
								<ButtonComponent
									style="rounded-3xl 2xl:w-1/5"
									btnText="Submit"
									type="submit"
									disabled={!formState.isValid}
									afterIcon="/assets/send.svg"
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

export default loginComponent;
