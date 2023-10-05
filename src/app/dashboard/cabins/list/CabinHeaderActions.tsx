'use client';
import { revalidateTag } from 'next/cache';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CabinHeaderActions = ({ updateStateData }: any) => {
	const router = useRouter();

	const [asc, setAsc] = useState(false);
	async function handleClick(query: any, operator = '=') {
		const url = query
			? `http://localhost:3000/api/cabins?${query.name}${operator}${query.val}`
			: `http://localhost:3000/api/cabins?`;
		try {
			const res = await fetch(url, {
				next: { tags: ['cabins'] }
			});

			if (!res.ok) {
				throw new Error(
					`Cabin could not be created Status: ${res.status}`
				);
			}
			// router.refresh();
			const data = await res.json();

			console.log(data.data);
			updateStateData(data.data);

			// parses JSON response into native JavaScript objects
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<div className="">
				<button
					onClick={() => handleClick(null)}
					type="button"
					className="w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn">
					All
				</button>
			</div>

			<div className="">
				<button
					onClick={() => handleClick({ name: 'discount', val: 0 })}
					type="button"
					className="w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn">
					No discount
				</button>
			</div>
			{asc && (
				<div className="">
					<button
						onClick={() => {
							handleClick({
								name: 'sort',
								val: 'createdAt'
							});
							setAsc((prev) => !prev);
						}}
						type="button"
						className="w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn">
						Sort Down
					</button>
				</div>
			)}
			{!asc && (
				<div className="">
					<button
						onClick={() => {
							handleClick({ name: 'sort', val: '-createdAt' });
							setAsc((prev) => !prev);
						}}
						type="button"
						className="w-full  text-xs px-6 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn">
						Sort Up
					</button>
				</div>
			)}
		</>
	);
};

export default CabinHeaderActions;
