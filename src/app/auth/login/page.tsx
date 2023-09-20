'use client';

import EmailInput from '@/components/form-inputs/Email-Input';
import TextInput from '@/components/form-inputs/Text-Input';
import ButtonComponent from '@/components/shared/Button-component';
import React from 'react';
import axios from 'axios';
// import axiosInstance from '@/app/utils/intercerptor';

const loginComponent = () => {
	async function handleLogin() {
		try {
			const response = await axios.post(
				'/api/auth/login',

				{
					email: 'test@gmail.com',
					password: '12345678'
				}
			);

			console.log(response.data);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<section className="flex flex-col min-h-screen h-fit items-center justify-center">
				<section className="bg-white dark:glass w-5/6 md:w-4/6 lg:w-1/3 py-10 px-5 flex gap-4 flex-col items-center justify-center">
					<p className="text-center text-primary dark:text-label-color font-bold text-2xl">
						Sign In to Get Started
					</p>

					<section className="flex flex-col gap-3 items-center justify-center w-full">
						<button
							onClick={handleLogin}
							className="btn flex gap-3 btn-primary !w-5/6">
							Google
						</button>

						<section className="text-primary dark:text-secondary">
							Or
						</section>
					</section>

					<section className="w-full">
						<form
							action=""
							className="w-full flex flex-col justify-center gap-2 items-center">
							<EmailInput name={'email'} label="Email" />
							<TextInput
								name={'password'}
								placeholder="Enter Password"
								label="Password"
								type="password"
							/>

							<section className=" ">
								<ButtonComponent
									style="rounded-3xl 2xl:w-1/5"
									btnText="Submit"
									type="submit"
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
								<a className="text-blue-600 text-sm">Sign up</a>
							</p>
						</form>
					</section>
				</section>
			</section>
		</>
	);
};

export default loginComponent;
