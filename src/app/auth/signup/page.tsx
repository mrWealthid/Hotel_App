'use client';
import axiosInstance from '@/app/utils/intercerptor';
import EmailInput from '@/components/form-inputs/Email-Input';
import TextInput from '@/components/form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Button-component';
import axios from 'axios';
import React from 'react';

const signupComponent = () => {
	async function handleRegister() {
		try {
			const response = await axiosInstance.post('/auth/register', {
				name: 'test User',
				email: 'tests@gmail.com',
				password: 12345678
			});

			console.log(response.data);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<>
			<section className="flex flex-col min-h-screen items-center justify-center">
				<section className="bg-white dark:glass lg:my-5 w-5/6 md:w-4/6 lg:w-1/2 py-10 px-6 flex gap-6 flex-col items-center justify-center">
					<p className="text-center text-primary dark:text-label-color font-bold text-2xl">
						Sign Up
					</p>

					<section className="flex flex-col gap-3 items-center justify-center w-full">
						<button
							onClick={handleRegister}
							className="btn flex gap-3 btn-primary">
							Google
						</button>

						<section className="text-primary dark:text-secondary">
							Or
						</section>
					</section>
					<form className="w-full flex flex-col gap-2 items-center">
						<div className="w-full flex gap-4">
							<TextInput
								name={'firstName'}
								placeholder="Enter First Name"
								label="First Name"
							/>
							<TextInput
								name={'lastName'}
								placeholder="Enter Last Name"
								label="Last Name"
							/>
						</div>
						<div className="w-full flex gap-4">
							<EmailInput name={'email'} label="Email" />

							<TextInput
								name={'password'}
								placeholder="Enter Password"
								label="Password"
								type="password"
							/>
						</div>

						<section className=" ">
							<ButtonComponent
								style="rounded-3xl 2xl:w-1/5"
								btnText="Submit"
								type="submit"
								afterIcon="/assets/send.svg"
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

export default signupComponent;
