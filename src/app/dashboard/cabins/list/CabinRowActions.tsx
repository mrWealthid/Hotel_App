'use client';

import React, { use, useState } from 'react';

import Link from 'next/link';

const CabinRowActions = ({ rowData }: any) => {
	function handleDelete(id: any) {
		console.log(id);
	}

	async function handleDuplicateCabin(rowData: any) {
		const { _id, id, ...rest } = rowData;

		try {
			const res = await fetch(
				`http://localhost:3000/api/cabins`,

				{
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					body: JSON.stringify(rest) // body data type must match "Content-Type" header
				}
			);

			if (!res.ok) {
				throw new Error(
					`Cabin could not be created Status: ${res.status}`
				);
			}
			return res.json(); // parses JSON response into native JavaScript objects
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<td className="p-2 md:px-2 md:py-4 space-x-3">
			<Link href={`cabins/edit/${rowData.id}`} className="text-xs popup">
				Edit
			</Link>

			<button
				onClick={() => handleDelete(rowData.id)}
				className="text-xs popup">
				Delete
			</button>

			<button
				onClick={() => handleDuplicateCabin(rowData)}
				className="text-xs popup">
				Duplicate
			</button>
		</td>
	);
};

export default CabinRowActions;
