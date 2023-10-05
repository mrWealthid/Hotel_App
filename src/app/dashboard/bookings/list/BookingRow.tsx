import { cloneElement } from 'react';
import BookingsRowActions from './BookingsRowActions';

function BookingRow({ data, children }: any) {
	return (
		<>
			{data.map((row: any, i: any) => {
				return (
					<tr
						key={i}
						className="bg-white relative border-b hover:bg-gray-50 ">
						<td className="p-2 font-medium md:px-2 md:py-4 whitespace-nowrap">
							<input
								title="check"
								id="checkbox-all-search"
								type="checkbox"
								className="w-4 h-4 m-0 border-gray-300 rounded focus:ring-gray-500 "
							/>
							<label
								htmlFor="checkbox-all-search text-sm"
								className="sr-only">
								#
							</label>
						</td>
						<td>{row.cabin.name}</td>
						<td>
							<span
								className={
									'text-sm font-semibold block  mb-1  rounded-3xl'
								}>
								{row.guests.name}
							</span>
							<span className={' text-xs block'}>
								{row.guests.email}
							</span>
						</td>

						<td>{row.totalPrice}</td>
						<td>
							<span className="bg-green-400 text-xs text-white py-2 px-3 rounded-3xl inline-flex">
								{row.checkStatus}
							</span>
						</td>
						<td>
							<span className="flex justify-center gap-2 flex-col">
								<span className="font-bold">
									{row.numNights} Night(s)
								</span>

								<span className="flex  text-xs gap-2">
									<span>
										{new Date(row.startDate).toDateString()}{' '}
										➡️
									</span>

									<span>
										{' '}
										{new Date(row.endDate).toDateString()}
									</span>
								</span>
							</span>
						</td>

						<BookingsRowActions rowData={row} />
					</tr>
				);
			})}
		</>
	);
}

export default BookingRow;
