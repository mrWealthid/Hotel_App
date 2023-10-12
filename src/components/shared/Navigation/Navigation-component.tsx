'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavigationComponent = (props: any) => {
	const pathname = usePathname();

	return (
		<>
			{props.nav.map((link: IRoute) => {
				const isActive = pathname === link.path;

				return (
					<Link
						className={`
                        cursor-pointer text-secondary text-sm
							${isActive ? ' px-3   py-2 border-none  glass rounded-full text-secondary' : ''}
						`}
						href={link.path}
						key={link.name}>
						{link.name}
					</Link>
				);
			})}
		</>
	);
};

export interface IRoute {
	name: string;
	path: string;
}
export default NavigationComponent;
