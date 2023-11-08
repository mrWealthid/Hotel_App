'use client';
import { revalidateTag } from 'next/cache';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiArrowDownCircle, HiArrowUpCircle } from 'react-icons/hi2';

const CabinHeaderActions = ({ handleFilter }: any) => {
	const router = useRouter();

	const [asc, setAsc] = useState(false);
	const [query, setQuery] = useState<{
		discount: string | number;
	} | null>(null);
	async function handleClick(query: any) {
		setQuery(query);
		query ? handleFilter(query) : handleFilter(null);
	}

	return (
		<>
			<div className="">
				<button
					onClick={() => handleClick(null)}
					type="button"
					className={`${
						query ?? '!bg-primary text-white'
					} w-full  text-xs px-6 py-2 rounded-3xl    dark:glass dark:border-none bg-gray-50 font-light text-black border btn`}>
					All
				</button>
			</div>

			<div className="">
				<button
					onClick={() => handleClick({ discount: 0 })}
					type="button"
					className={`${
						query?.discount === 0 && '!bg-primary text-white'
					} w-full  text-xs px-6 py-2 rounded-3xl  dark:glass dark:border-none  bg-gray-50 font-light text-black border btn`}>
					No discount
				</button>
			</div>
			{asc && (
				<div className="">
					<button
						onClick={() => {
							handleClick({
								sort: 'createdAt'
							});
							setAsc((prev) => !prev);
						}}
						type="button"
						className="w-full  flex gap-2 items-center  dark:glass dark:border-none  text-xs px-2 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn">
						<HiArrowDownCircle color="red" size={20} />
						Sort Down
					</button>
				</div>
			)}
			{!asc && (
				<div className="">
					<button
						onClick={() => {
							handleClick({ sort: '-createdAt' });
							setAsc((prev) => !prev);
						}}
						type="button"
						className="w-full  flex gap-2 items-center  dark:glass dark:border-none text-xs px-2 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn">
						<HiArrowUpCircle size={20} color="green" />
						Sort Up
					</button>
				</div>
			)}
		</>
	);
};

export default CabinHeaderActions;
