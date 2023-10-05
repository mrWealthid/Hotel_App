'use client';
import { formatCurrency, getStatusColor } from '@/utils/helpers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const page = ({ params }: any) => {
	const bookingId = params.bookingId;
	const router = useRouter();
	const [data, setData] = useState<any>({});

	const [hasPaid, setHasPaid] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		setHasPaid(data.isPaid);
	}, [data]);

	async function fetchData() {
		const response = await fetch(`/api/bookings/${bookingId}`);

		const data = await response.json();

		setData(data.data);
	}
	async function handleCheckIn(data: any) {
		try {
			const res = await fetch(`/api/bookings/${bookingId}`, {
				method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
				body: JSON.stringify(data) // body data type must match "Content-Type" header
			});

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}

			toast.success('Checking-In successful');

			await res.json();

			router.push('/dashboard/bookings');

			// parses JSON response into native JavaScript objects
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section className="flex  flex-col gap-3">
			<section className="flex justify-between items-center">
				<section className="flex items-center gap-2">
					<h1 className="title"> Check- In Booking </h1>
					<span
						className={` ${getStatusColor(
							data.checkStatus
						)} text-xs text-white py-2 px-3 rounded-3xl inline-flex`}>
						{data.checkStatus}
					</span>
				</section>

				<Link href={'./'}>Back</Link>
			</section>

			<div className="text-sm bg-white flex pb-3 flex-col gap-2">
				<section className="bg-primary flex justify-between text-white py-6 px-4">
					<section className="flex items-center gap-1">
						<span>Icon</span>
						<span>{data.numNights} Night(s) in Cabin</span>
						<span className="font-medium">{data.cabin?.name}</span>
					</section>
					<section className="flex gap-3">
						<span className="flex  text-xs gap-2">
							<span>
								{new Date(data.startDate).toDateString()} ➡️
							</span>

							<span>
								{' '}
								{new Date(data.endDate).toDateString()}
							</span>
						</span>
					</section>
				</section>

				<section className="flex flex-col px-3 py-2 gap-2">
					<section className="flex gap-2">
						<section className="font-medium">
							{data.guests?.name} + {data.numGuests} guest
						</section>
						<section className="font-medium">
							· {data.guests?.email}
						</section>
						<section>
							· National ID {data.guests?.nationalId}{' '}
						</section>
					</section>

					{data.observations && (
						<section className="font-medium">
							<span>
								Observations:{' '}
								<span className="font-light">
									{data.observations}
								</span>{' '}
							</span>
						</section>
					)}
					<section className="font-medium">
						<span>
							Breakfast Included?{' '}
							{data.hasBreakfast ? 'Yes' : 'No'}
						</span>
					</section>
				</section>

				<section className="bg-primary-lighter py-6 flex justify-between px-4 m-3">
					<section className="flex gap-2">
						<span>Total price</span>
						<span>
							{formatCurrency(data.totalPrice)} (
							{formatCurrency(data.cabinPrice)} cabin +{' '}
							{formatCurrency(450)}
							breakfast ){' '}
						</span>
					</section>
					<section className="font-medium">
						{' '}
						{data.isPaid ? 'PAID' : 'NOT PAID'}
					</section>
				</section>
				{!data.isPaid && (
					<section className="bg-white py-6 items-center flex gap-2 px-4 m-3">
						<input
							title="check"
							id="checkbox-all-search"
							type="checkbox"
							checked={hasPaid}
							onChange={(e) => setHasPaid(e.target.checked)}
							className="w-4 h-4 m-0 border-gray-300 rounded focus:ring-gray-500 "
						/>
						<label
							htmlFor="checkbox-all-search text-sm"
							className="sr-only">
							#
						</label>
						<span>
							I can confirm{' '}
							<span>
								{data?.guests?.name} has paid the total amount{' '}
								{formatCurrency(data.totalPrice)}
							</span>
						</span>
					</section>
				)}

				<section className="flex items-center gap-3 justify-end px-4">
					{data.checkStatus === 'UNCONFIRMED' && (
						<div>
							<button
								disabled={!hasPaid}
								type="button"
								onClick={() =>
									handleCheckIn({
										isPaid: hasPaid,
										checkStatus: 'CHECKED_IN'
									})
								}
								className=" bg-primary disabled:bg-primary-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-3xl">
								Check-In
							</button>
						</div>
					)}

					<span>
						Booked, {new Date(data.createdAt).toDateString()}
					</span>
				</section>
			</div>
		</section>
	);
};

export default page;
