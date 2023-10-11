'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useRef, useState } from 'react';
import useClickOutside from '../shared/hooks/ClickOutside';

export interface IRoute {
	name: string;
	path: string;
}
const SideBar = () => {
	const routes: IRoute[] = [
		{ name: 'Home', path: '/dashboard' },
		{ name: 'Bookings', path: '/dashboard/bookings' },
		{ name: 'Cabins', path: '/dashboard/cabins' },
		{ name: 'Users', path: '/dashboard/users' },
		{ name: 'Settings', path: '/dashboard/settings' }
	];
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	function handleClose() {
		if (!setIsOpen) return;
		setIsOpen(false);
	}

	useClickOutside(ref, () => {
		handleClose();
	});

	return (
		<section ref={ref} className="flex">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="inline-flex top-2  absolute z-40 bg-white items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-4 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
				</svg>
			</button>

			<aside
				className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform ${
					!isOpen ? '-translate-x-full' : ''
				} sm:translate-x-0`}>
				<div className="flex flex-col  min-h-screen  bg-primary text-white py-4">
					<p className="flex justify-center space-x-4 text-white">
						Logo
					</p>
					<section className="flex flex-col bg-inherit gap-3  mt-10 px-4">
						{routes.map((link) => {
							const isActive = pathname === link.path;

							return (
								<Link
									onClick={handleClose}
									href={link.path}
									key={link.name}
									className={`hover:translate-x-1  rounded-lg text-sm transition-all duration-500 flex items-center gap-2 ${
										isActive
											? 'px-3   py-2 border-none  glass  text-white'
											: ''
									}`}>
									{link.name}
								</Link>
							);
						})}
					</section>
				</div>
			</aside>
		</section>
	);
};

export default SideBar;
