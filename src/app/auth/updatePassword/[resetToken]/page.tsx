'use client';
import ButtonComponent from '@/components/shared/Form-inputs/Button';
import TextInput from '@/components/shared/Form-inputs/Text-Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUpdatePassword } from '../../hooks/useAuth';
import { IUpdatePassword } from '../../model/model';

const UpdatePasswordComponent = ({ params }: any) => {
	const { register, handleSubmit, getValues, formState } = useForm({
		mode: 'onChange'
	});

	const token = params.resetToken;

	const router = useRouter();
	const { isLoading, updatePassword } = useUpdatePassword();

	async function onSubmit(payload: any) {
		const data: IUpdatePassword = {
			...payload,
			resetToken: token
		};

		updatePassword(data, { onSuccess: () => router.push('/auth/login') });
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
						Update Password
					</p>

					<section className="w-full">
						<form
							onSubmit={handleSubmit(onSubmit, onError)}
							action=""
							className="w-full flex flex-col justify-center gap-2 items-center">
							<TextInput
								name={'password'}
								label="Password"
								error={errors?.[
									'password'
								]?.message?.toString()}>
								<div className="input-style !p-0 !pr-2 !overflow-hidden">
									<input
										className="w-full  dark:bg-transparent   border-none outline-none focus:ring-0 ring-0 "
										type={
											showPassword ? 'text' : 'password'
										}
										{...register('currentPassword', {
											required: 'This field is required'
										})}
										id="psw"
										placeholder="Enter Password"
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
							<TextInput
								name={'password'}
								label="Password"
								error={errors?.[
									'password'
								]?.message?.toString()}>
								<div className="input-style !p-0 !pr-2 !overflow-hidden">
									<input
										className="w-full  dark:bg-transparent   border-none outline-none focus:ring-0 ring-0 "
										type={
											showPassword ? 'text' : 'password'
										}
										{...register('newPassword', {
											required: 'This field is required'
										})}
										id="newPassword"
										placeholder="Enter New  Password"
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
							<TextInput
								name={'password'}
								label="Password"
								error={errors?.[
									'password'
								]?.message?.toString()}>
								<div className="input-style !p-0 !pr-2 !overflow-hidden">
									<input
										className="w-full  dark:bg-transparent   border-none outline-none focus:ring-0 ring-0 "
										type={
											showPassword ? 'text' : 'password'
										}
										{...register('confirmNewPassword', {
											required: 'This field is required'
										})}
										placeholder="Confirm New Password"
										id="confirmPassword"
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
									styles="rounded-3xl 2xl:w-1/5"
									btnText="Submit"
									loading={isLoading}
									type="submit"
									disabled={!formState.isValid || isLoading}
								/>
							</section>

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

export default UpdatePasswordComponent;
