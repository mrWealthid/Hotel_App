import React, { cloneElement, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { createContext } from 'react';
import { useOutsideClick } from '../Hooks/useOutSideClick';

const ModalContext = createContext({});

function Modal({ children, size = 'w-1/2' }: any) {
	const [openName, setOpenName] = useState('');

	const close = () => setOpenName('');

	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open, size }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens }: any) {
	const { open }: any = useContext(ModalContext);

	return cloneElement(children, { onClick: () => open(opens) });
}

const Window = ({ name, children }: any) => {
	const { openName, close, open, size }: any = useContext(ModalContext);

	useOutsideClick(close);
	// useEffect(() => {
	// 	function handleClick(e: any) {
	// 		if (e.target.classList.contains('backdrop')) {
	// 			close();

	// 			console.log('click out');
	// 		}
	// 	}

	// 	document.addEventListener('click', handleClick);
	// 	return () => document.removeEventListener('click', handleClick);
	// }, [close]);

	if (name !== openName) return null;
	return createPortal(
		<section>
			<div
				className={` ${
					open
						? 'visible scale-100 opacity-100'
						: 'invisible scale-50  opacity-0'
				} overflow-y-auto backdrop overflow-x-hidden fixed top-0 right-0 bg-gray-800 bg-opacity-80 left-0 z-50 md:inset-0 h-modal h-full justify-center items-center flex transition-all ease-in-out duration-1500`}
				id="popup-modal">
				<div className={`${size} relative p-6  h-auto`}>
					<div className="relative  bg-white skin rounded-lg shadow  p-4">
						<button
							className="absolute top-3 right-2.5 text-white bg-primary z-50 hover:bg-primary hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-primary dark:hover:text-white"
							data-modal-toggle="popup-modal"
							type="button">
							<svg
								onClick={close}
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									clipRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									fillRule="evenodd"></path>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>

						{cloneElement(children, { onCloseModal: close })}
					</div>
				</div>
			</div>
		</section>,
		document.body
	);
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
