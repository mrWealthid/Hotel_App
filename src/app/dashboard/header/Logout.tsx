'use client';
import { useLogout } from '@/app/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { PiSpinnerGapLight } from 'react-icons/pi';

const Logout = () => {
	const router = useRouter();
	const { isLoading, loggingOut } = useLogout(router);
	return (
		<div
			className=" flex items-center gap-1 cursor-pointer"
			onClick={() => loggingOut()}>
			Logout
			{isLoading && <PiSpinnerGapLight />}
		</div>
	);
};

export default Logout;
