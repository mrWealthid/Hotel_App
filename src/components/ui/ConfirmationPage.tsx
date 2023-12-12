import React from 'react';

const ConfirmationPage = ({ modalText, onCloseModal, handler }: any) => {
	return (
		<div className="p-6 text-center">
			<svg
				className="mx-auto mb-4 text-red-600 w-12 h-12 dark:text-red-600"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20">
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
			<h3 className="mb-5  text-gray-500 dark:text-white">
				{modalText} ?
			</h3>
			<button
				onClick={() => handler(onCloseModal)}
				data-modal-hide="popup-modal"
				type="button"
				className="text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-2xl text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
				Yes, I&apos;m sure
			</button>

			<button
				onClick={onCloseModal}
				data-modal-hide="popup-modal"
				type="button"
				className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-2xl border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
				No, cancel
			</button>
		</div>
	);
};

export default ConfirmationPage;
