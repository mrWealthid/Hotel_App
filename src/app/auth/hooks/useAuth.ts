import { useMutation, useQuery } from '@tanstack/react-query';
import {
	ILogin,
	IRegister,
	handleLogin,
	handleRegister
} from '../service/auth-service';

import toast from 'react-hot-toast';

export function useLogin(router: any) {
	const { isLoading, mutate: login } = useMutation({
		mutationFn: (payload: ILogin) => handleLogin(payload),

		onSuccess: () => {
			router.push('/dashboard');
		},
		onError: (err: any) => toast.error(err.message)
	});

	return {
		isLoading,
		login
	};
}
export function useRegister(router: any) {
	const { isLoading, mutate: registering } = useMutation({
		mutationFn: (payload: IRegister) => handleRegister(payload),

		onSuccess: () => {
			router.push('/dashboard');
		},
		onError: (err: any) => toast.error(err.message)
	});

	return {
		isLoading,
		registering
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
