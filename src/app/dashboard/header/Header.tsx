import { getData } from '@/utils/apiRequests';
import React from 'react';
import Profile from '../profile/Profile';
import Link from 'next/link';
import SwitchToggle from '@/components/shared/Switch/SwitchToggle';

const Header = async () => {
	return (
		<div className="py-4 px-2  text-sm glass items-center   w-full flex justify-end gap-3 text-black dark:text-white">
			<Profile />
			<SwitchToggle />
			<Link href={'/dashboard/account'}>Account</Link>
			<span>Logout</span>
		</div>
	);
};

export default Header;
