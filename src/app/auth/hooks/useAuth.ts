import { Router } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import {
	ILogin,
	IRegister,
	handleLogin,
	handleLogout,
	handlePasswordReset,
	handleRegister
} from '../service/auth-service';

import toast from 'react-hot-toast';
import { handleClientErrorMessage } from '@/utils/helpers';

export function useLogin() {
	const { isLoading, mutate: login } = useMutation({
		mutationFn: (payload: ILogin) => handleLogin(payload),
		onError: (err: any) => toast.error(err.message)
	});

	return {
		isLoading,
		login
	};
}
export function useRegister() {
	const { isLoading, mutate: registering } = useMutation({
		mutationFn: (payload: IRegister) => handleRegister(payload),

		onError: (err: any) => toast.error(err.message)
	});

	return {
		isLoading,
		registering
	};
}
export function useLogout(router: any) {
	const { isLoading, mutate: loggingOut } = useMutation({
		mutationFn: () => handleLogout(),
		onSuccess: () => router.push('/auth/login'),
		onError: (err: any) => toast.error(handleClientErrorMessage(err))
	});

	return {
		isLoading,
		loggingOut
	};
}
export function useResetPassword() {
	const { isLoading, mutate: resetPassword } = useMutation({
		mutationFn: (payload) => handlePasswordReset(payload),
		onSuccess: (data) => toast.success(data.message),
		onError: (err: any) => toast.error(handleClientErrorMessage(err))
	});

	return {
		isLoading,
		resetPassword
	};
}

// const { isLoading, data, error } = useMutation({
// 	queryKey: ['auth'],
// 	queryFn: () => handleRegister(payload),

// 	onSuccess: () => {
// 		router.push('/dashboard');
// 	},
// 	onError: (err: any) => toast.error(err.message)
// });

// return {
// 	isLoading,
// 	error,
// 	data: data?.data
// };
