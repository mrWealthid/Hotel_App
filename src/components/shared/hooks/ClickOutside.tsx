'use client';
import { useEffect, MutableRefObject } from 'react';

type RefType = HTMLElement | null;

function useClickOutside(
	ref: MutableRefObject<RefType>,
	callback: () => void
): void {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
}

export default useClickOutside;
