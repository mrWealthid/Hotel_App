'use client';
import React from 'react';
import { useProfile } from './hooks/useProfile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Profile = () => {
	const { data, isLoading, error } = useProfile();
	const router = useRouter();

	return (
		<div className="flex  items-center gap-2">
			<Image
				onClick={() => router.push('/dashboard/account')}
				width={25}
				height={25}
				className="border cursor-pointer rounded-full"
				alt="default"
				src={'/images/default.jpg'}
			/>
			<span className="capitalize">{data?.name}</span>
		</div>
	);
};

export default Profile;
