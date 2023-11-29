'use client';
import { formatCurrency, getStatusColor } from '@/utils/helpers';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useCheckInBooking } from '../../hooks/useDashboard';
import { createPaymentSession } from '../../service/dashboard.service';

const Page = ({ params }: any) => {
	const bookingId = params.bookingId;
	const router = useRouter();
	const [data, setData] = useState<any>({});

	const [hasPaid, setHasPaid] = useState(false);
	const [isCard, setIsCard] = useState(false);
	const [withBreakfast, setWithBreakfast] = useState(false);
	const [settings, setSettings] = useState<any>({});

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		setHasPaid(data.isPaid);
	}, [data]);

	useEffect(() => {
		setWithBreakfast(data.hasBreakfast);
	}, [data]);
	useEffect(() => {
		fetchSettings();
	}, []);

	const { isCheckingIn, checkInBooking } = useCheckInBooking(bookingId);

	async function fetchData() {
		const response = await axios(`/api/bookings/${bookingId}`);

		const data = await response.data;
		setData(data.data);
	}

	async function fetchSettings() {
		try {
			const response = await axios(`/api/settings`);
			const data = await response.data;

			setSettings(data.data);
		} catch (err: any) {
			console.log(err);
		}
	}

	function verifyPayment() {
		let payload = {};
		if (data.hasBreakfast) {
			payload = { isPaid: hasPaid, checkStatus: 'CHECKED_IN' };
		}
		if (!data.hasBreakfast) {
			payload = {
				isPaid: hasPaid,
				checkStatus: 'CHECKED_IN',
				hasBreakfast: withBreakfast,
				totalPrice: data.totalPrice + calculateBreakfastPrice(),
				extrasPrice: settings.breakfastPrice
			};
		}
		return payload;
	}

	async function handleCheckIn() {
		if (!hasPaid) return;
		let payload = verifyPayment();

		checkInBooking(payload, { onSuccess: () => router.push('/dashboard') });
	}

	function addBreakfast(e: any) {
		if (e.target.checked) {
			hasPaid && setHasPaid(!hasPaid);
		} else if (!e.target.checked) {
			setHasPaid(data.isPaid);
		}
		setWithBreakfast(e.target.checked);
	}

	function calculateBreakfastPrice() {
		return (
			parseInt(settings.breakfastPrice) * data.numNights * data.numGuests
		);
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

				<Link
					className="bg-primary text-sm dark:glass disabled:bg-primary-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-3xl"
					href={'../'}>
					Back
				</Link>
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
						{data.isPaid ? 'PAID' : 'NOT PAID'}
					</section>
				</section>

				{!data.hasBreakfast && (
					<section className="bg-white items-center flex gap-2 px-4 m-3">
						<input
							title="check"
							id="breakfast"
							type="checkbox"
							checked={withBreakfast}
							onChange={addBreakfast}
							className="w-4 h-4 m-0 border-gray-300 rounded focus:ring-gray-500 "
						/>
						<label htmlFor="breakfast" className="sr-only">
							#
						</label>
						<span>
							Want to add breakfast for
							<span>
								{formatCurrency(calculateBreakfastPrice())}?
							</span>
						</span>
					</section>
				)}

				<section className="bg-yellow-50 flex flex-col gap-2 p-4 m-3">
					<p>Payment Method</p>
					<section className="flex gap-2">
						<div className="flex gap-1 items-center">
							<input
								title="cash payment"
								id="check"
								type="radio"
								checked={!isCard}
								onChange={(e) => setIsCard(false)}
								className="w-4 h-4 m-0 border-gray-300 rounded-full text-primary focus:ring-primary "
							/>
							<label htmlFor="check">Cash Payment</label>
						</div>
						<div className="flex gap-1 items-center">
							<input
								title="card payment"
								id="card"
								type="radio"
								checked={isCard}
								onChange={(e) => setIsCard(true)}
								className="w-4 h-4 m-0 border-gray-300 rounded-full text-primary focus:ring-primary "
							/>
							<label htmlFor="card">Card Payment</label>
						</div>
					</section>
				</section>

				{!isCard && (
					<section className="bg-white items-center flex gap-2 px-4 m-3">
						<input
							title="check"
							id="payment"
							type="checkbox"
							checked={hasPaid}
							onChange={(e) => setHasPaid(e.target.checked)}
							className="w-4 h-4 m-0 text-primary border-gray-300 rounded focus:ring-primary "
						/>
						<label htmlFor="payment" className="sr-only">
							#
						</label>
						<span>
							I can confirm{' '}
							<span>
								<strong>{data?.guests?.name}</strong> has paid
								the total amount{' '}
								{!withBreakfast && (
									<span>
										<strong>
											{formatCurrency(data.totalPrice)}
										</strong>
									</span>
								)}
								{withBreakfast && (
									<span>
										{formatCurrency(
											data.totalPrice +
												calculateBreakfastPrice()
										)}
									</span>
								)}
							</span>
						</span>
					</section>
				)}

				<section className="flex items-center gap-3 justify-end px-4">
					{data.checkStatus === 'UNCONFIRMED' && !isCard && (
						<div>
							<button
								disabled={!hasPaid}
								type="button"
								onClick={handleCheckIn}
								className=" bg-primary disabled:bg-primary-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-3xl">
								Check-In
							</button>
						</div>
					)}
				</section>
				<section className="flex items-center gap-3 justify-end px-4">
					{data.checkStatus === 'UNCONFIRMED' && isCard && (
						<div>
							<button
								type="button"
								onClick={() => createPaymentSession(bookingId)}
								className=" bg-primary disabled:bg-primary-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-3xl">
								Pay with Stripe
							</button>
						</div>
					)}
				</section>

				<div className="flex justify-end text-xs  px-4">
					<span>
						Booked, {new Date(data.createdAt).toDateString()}
					</span>
				</div>
			</div>
		</section>
	);
};

export default Page;
