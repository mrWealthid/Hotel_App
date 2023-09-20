'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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

	return (
		<div className="flex flex-col  min-h-screen  bg-primary text-white py-4">
			<p className="flex justify-center space-x-4 text-white">Logo</p>
			<section className="flex flex-col bg-inherit gap-3  mt-10 px-4">
				{routes.map((link) => {
					const isActive = pathname === link.path;

					return (
						<Link
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
	);
};

export default SideBar;
