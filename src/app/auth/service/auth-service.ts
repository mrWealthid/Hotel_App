import { handleClientErrorMessage } from '@/utils/helpers';
import axios from 'axios';
import { ILogin, IRegister, IUpdatePassword } from '../model/model';

export async function handleLogin(payload: ILogin) {
	try {
		const res = await axios.post(`/api/auth/login`, payload);
		const data = await res.data;
		return data;
	} catch (err: any) {
		throw Error(handleClientErrorMessage(err));
	}
}
export async function handleRegister(payload: IRegister) {
	try {
		const res = await axios.post(`/api/auth/register`, payload);
		const data = await res.data;

		return data;
	} catch (err) {
		throw Error(handleClientErrorMessage(err));
	}
}
export async function handleForgetPassword(payload: any) {
	try {
		const res = await axios.post(`/api/auth/forgotPassword`, payload);
		const data = await res.data;
		return data;
	} catch (err) {
		throw Error(handleClientErrorMessage(err));
	}
}
export async function handleUpdatePassword(payload: IUpdatePassword) {
	try {
		const res = await axios.post(`/api/auth/updatePassword`, payload);

		const data = await res.data;

		return data;
	} catch (err) {
		throw Error(handleClientErrorMessage(err));
	}
}
export async function handleResetPassword(payload: IUpdatePassword) {
	try {
		const res = await axios.post(`/api/auth/resetPassword`, payload);
		const data = await res.data;
		return data;
	} catch (err) {
		throw Error(handleClientErrorMessage(err));
	}
}
export async function handleLogout() {
	try {
		await axios(`/api/auth/logout`);
	} catch (err) {
		throw Error(handleClientErrorMessage(err));
	}
}
