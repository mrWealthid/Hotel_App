'use client';
import React from 'react';
import { useProfile } from './hooks/useProfile';
import Image from 'next/image';

const Profile = () => {
	const { data, isLoading, error } = useProfile();

	return (
		<div className="flex items-center gap-2">
			<Image
				width={25}
				height={25}
				className="border rounded-full"
				alt="default"
				src={'/images/default.jpg'}
			/>
			<span className="capitalize">{data?.name}</span>
		</div>
	);
};

export default Profile;
