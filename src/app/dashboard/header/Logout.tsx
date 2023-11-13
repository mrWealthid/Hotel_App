'use client';
import { useLogout } from '@/app/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react';

const Logout = () => {
    const router = useRouter();
	const { loggingOut } = useLogout(router);
	return (
		<div className="cursor-pointer" onClick={() => loggingOut( )}>
			Logout
		</div>
	);
};

export default Logout;
