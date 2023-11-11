'use client';

import React, { useState } from 'react';
import AccountForm from './accountForm';
import { getData } from '@/utils/apiRequests';
import { useProfile } from '../profile/hooks/useProfile';
import Image from 'next/image';

const Page = () => {
	const [stage, setStage] = useState<number>(0);
	const { data, isLoading } = useProfile();

	function updateStage(val: number) {
		setStage(val);
	}
	return (
		<section className="">
			<h1 className="title">Account </h1>
			<section className="flex dark:text-secondary text-primary lg:flex-row flex-col w-full animate-slideIn container-text  gap-3 ">
				<section className=" card h-fit p-6  flex gap-6 border dark:border-none  w-full  lg:w-1/2 2xl:w-1/3 rounded-2xl">
					<div className="py-3">
						<Image
							className="border dark:border-primary-light rounded-full mx-0 w-32 object-cover h-32"
							height="820"
							alt="default"
							src={'/images/default.jpg'}
							width="900"
						/>

						{/* <Image
						width={25}
						height={25}
						className="border rounded-full"
						alt="default"
						src={'/images/default.jpg'}
					/> */}
					</div>
					<section className="flex flex-col gap-4">
						<p className="lg:text-lg">Personal Details</p>
						<span className="text-xs">
							<i className="fa-solid fa-user"></i> {data?.name}
						</span>
						<span className="text-xs">
							<i className="fa-solid  fa-at"></i>
							{data?.email}
						</span>

						<span className=" flex capitalize justify-center w-1/2 px-2 py-1 text-sm rounded-full">
							{data?.role}
						</span>
					</section>
				</section>

				<AccountForm
					data={data}
					stage={stage}
					updateStage={updateStage}
				/>
			</section>
		</section>
	);
};

export default Page;
