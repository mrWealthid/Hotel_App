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
	} catch (err) {
		console.log(err);
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
		console.log(err);
	}
}
