import { getData } from '@/utils/apiRequests';
import React from 'react';
import Profile from '../profile/Profile';
import Link from 'next/link';

const Header = async () => {
	// async function fetchData() {
	// 	const url = `http://localhost:3000/api/users/me`;

	// 	try {
	// 		const response = await fetch(url);

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}

	// 		return await response.json();
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }
	// const data = await fetchData();

	return (
		<div className="py-5 px-2  text-sm glass items-center   w-full flex justify-end gap-3 text-black">
			<Profile />

			<Link href={'/dashboard/account'}>Account</Link>
			<span>Logout</span>
		</div>
	);
};

export default Header;
