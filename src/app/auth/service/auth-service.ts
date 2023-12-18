import { handleClientErrorMessage } from '@/utils/helpers';
import axios from 'axios';

export interface ILogin {
	email: string;
	password: string;
}

export interface IRegister {
	name: string;
	email: string;
	password: string;
	role?: 'user' | 'admin';
}

export async function handleLogin(payload: ILogin) {
	try {
		const res = await axios.post(
			`/api/auth/login`,

			payload
		);

		// router.push('/dashboard');

		const data = await res.data; // parses JSON response into native JavaScript objects

		// localStorage.setItem('token', data.token);

		// console.log(data.token);

		return data;
	} catch (err: any) {
		throw Error(handleClientErrorMessage(err));
	}
}
export async function handleRegister(payload: IRegister) {
	try {
		const res = await axios.post(
			`/api/auth/register`,

			payload
		);

		// router.push('/dashboard');

		const data = await res.data; // parses JSON response into native JavaScript objects

		// localStorage.setItem('token', data.token);

		// console.log(data.token);

		return data;
	} catch (err) {
		throw Error(handleClientErrorMessage(err));
	}
}
export async function handlePasswordReset(payload: any) {
	try {
		const res = await axios.post(`/api/auth/forgotPassword`, payload);

		const data = await res.data;

		return data;
	} catch (err) {
		throw Error(handleClientErrorMessage(err));
	}
}
export async function handleLogout() {
	try {
		const res = await axios(`/api/auth/logout`);
	} catch (err) {
		throw Error(handleClientErrorMessage(err));
	}
}
