import { Fragment, MutableRefObject, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import ReceiptPage from '@/components/ui/ReceiptPage';
import { useReactToPrint } from 'react-to-print';
import { MdOutlineAttachEmail, MdOutlineLocalPrintshop } from 'react-icons/md';

export default function ReceiptPopup({ activity, open = true, setOpen }: any) {
	// const [open, setOpen] = useState(true);

	const componentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef?.current
	});

	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10 reciept-modal"
				initialFocus={cancelButtonRef}
				onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<Dialog.Panel className="receipt-content relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white ">
									<div className="">
										{/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<ExclamationCircleIcon
												className="h-6 w-6 text-red-600"
												aria-hidden="true"
											/>
										</div> */}

										{/* <p ref={componentRef}>Wealth Iduwe</p> */}
										<div className="">
											<Dialog.Title
												as="h3"
												className="text-base font-semibold leading-6 text-gray-900"></Dialog.Title>
											<div className="">
												<p className="text-sm text-gray-500">
													<ReceiptPage
														ref={componentRef}
														{...activity}
													/>
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 flex flex-col gap-2 sm:flex-row-reverse sm:px-6">
									{/* <button
										type="button"
										className="inline-flex w-full items-center gap-1 justify-center rounded-2xl bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
										onClick={() => setOpen(false)}>
										<MdOutlineAttachEmail />
										Email Reciept
									</button> */}
									<button
										type="button"
										className="inline-flex w-full gap-1 items-center justify-center rounded-2xl bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
										onClick={() => {
											setOpen(false);
											handlePrint();
										}}>
										<MdOutlineLocalPrintshop />
										Print Receipt
									</button>
									<button
										type="button"
										className="mt-3 inline-flex gap-1 items-center w-full justify-center rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
										onClick={() => setOpen(false)}
										ref={cancelButtonRef}>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
