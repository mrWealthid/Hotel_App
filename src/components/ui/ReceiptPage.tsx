import { formatCurrency } from '@/utils/helpers';
import React from 'react';

const ReceiptPage = React.forwardRef((props, ref) => {
	const { guests, numGuests, numNights, totalPrice, cabin, cabinPrice }: any =
		props;
	return (
		<section
			ref={ref}
			className="bg-white pb-10 w-full  text-primary flex flex-col gap-3 ">
			<section className="flex justify-end text-white p-6 bg-primary">
				<p>BookingStays</p>
			</section>

			<section className="px-8 flex flex-col gap-8">
				<section className="text-lg font-semibold">Receipt</section>

				{/* Time and reference */}
				<section className="">
					<section>
						<small>Date:</small>
						<small> {new Date().toLocaleString()} </small>
					</section>
					<section>
						<small>Payment Ref:</small>
						<span></span>
					</section>
				</section>

				{/* Bill Details */}

				<section className="flex justify-between">
					<section className=" flex flex-col">
						<p className=" font-medium">Bill To</p>
						<small>{guests?.name}</small>
						<small>{guests?.email}</small>
						<small>{guests?.nationality}</small>
					</section>
					{/* <section className="">
						<p>:</p>
					</section> */}

					<section className=" flex flex-col">
						<p className=" font-medium">Company</p>

						<small>13333 Ball Street</small>
						<small>Nashville, Tennese</small>
						<small>test@gmail.com</small>
						<small>1192293939</small>
					</section>
				</section>

				<section>
					<p className=" font-medium pb-2">ITEM</p>

					<hr className="pb-2" />
					<section className="text-xs">
						<section className="grid grid-cols-5 gap-2 ">
							<div>Cabin</div>
							<div>GUESTS</div>

							<div>NIGHTS</div>
							<div>Cabin Price </div>
							<div>TOTAL</div>
						</section>

						<section className="grid grid-cols-5 gap-2">
							<div>{cabin?.name}</div>
							{/* <div>{guests?.name}</div> */}
							<div>{numGuests}</div>
							<div>{numNights}</div>

							<div>{formatCurrency(cabinPrice)} </div>
							<div>{formatCurrency(totalPrice)}</div>
						</section>
						{/* <section className="flex justify-between"></section> */}
					</section>
				</section>

				<section className="flex text-sm  justify-end">
					<div>
						<div className="flex  justify-end gap-3">
							<p>SUB TOTAL:</p>
							<span>{formatCurrency(totalPrice)}</span>
						</div>

						<div className="flex justify-end gap-3">
							<p>ORDER TOTAL:</p>

							<span>{formatCurrency(totalPrice)}</span>
						</div>
					</div>
				</section>

				<section className="text-center italic text-xs">
					<p>...Thank you for choosing us...</p>
				</section>
			</section>
		</section>
	);
});

ReceiptPage.displayName = 'RecieptPage';
export default ReceiptPage;
