// 'use client';
// import { useEffect, useRef } from 'react';

// export const useOutsideClick = (handler: any, listenCapturing = true) => {
// 	const ref = useRef<any>();

// 	useEffect(() => {
// 		function handleClick(e: any) {
// 			if (e.target.classList.contains('backdrop')) {
// 				handler();

// 				console.log('click out');
// 			}

// 			// This didn't work can not debug yet
// 			// if (ref.current && !ref.current.contains(e.target)) {
// 			// 	console.log('got here');

// 			// 	handler();
// 			// }
// 		}

// 		document.addEventListener('click', handleClick, listenCapturing);
// 		return () =>
// 			document.removeEventListener('click', handleClick, listenCapturing);
// 	}, [handler, listenCapturing, ref]);

// 	return ref;
// };

import { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Only close if the click is outside the ref element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler]);
}
