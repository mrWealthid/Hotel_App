import { getData } from '@/utils/apiRequests';
import React from 'react';
import Profile from '../profile/Profile';
import Link from 'next/link';
import SwitchToggle from '@/components/shared/Switch/SwitchToggle';
import { cookies } from 'next/headers';
import Logout from './Logout';

const Header = async () => {
	// async function deleteTokens() {
	// 	cookies().delete('token');
	// }
	return (
		<div className="py-4 px-2  text-sm glass items-center   w-full flex justify-end gap-3 text-black dark:text-white">
			<Profile />
			<SwitchToggle />
			<Link href={'/dashboard/account'}>Account</Link>
			<Logout />
		</div>
	);
};

export default Header;
