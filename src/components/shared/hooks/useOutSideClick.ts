import { createRef, useEffect, useRef } from 'react';

export const useOutsideClick = (handler: any, listenCapturing = true) => {
	const ref = useRef<any>();

	useEffect(() => {
		function handleClick(e: any) {
			if (e.target.classList.contains('backdrop')) {
				handler();

				console.log('click out');
			}

			// This didn't work can not debug yet
			// if (ref.current && !ref.current.contains(e.target)) {
			// 	console.log('got here');

			// 	handler();
			// }
		}

		document.addEventListener('click', handleClick, listenCapturing);
		return () =>
			document.removeEventListener('click', handleClick, listenCapturing);
	}, [handler, listenCapturing, ref]);

	return ref;
};
