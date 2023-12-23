'use client';

import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { BsSortDown, BsSortUp } from 'react-icons/bs';
import { LiaSortSolid } from 'react-icons/lia';
import { TbDiscount2Off } from 'react-icons/tb';

const CabinHeaderActions = ({ handleFilter }: any) => {
	const [query, setQuery] = useState<{
		discount: string | number;
	} | null>(null);
	async function handleClick(query: any) {
		setQuery(query);
		query ? handleFilter(query) : handleFilter(null);
	}

	function handleSortFilter(sortValue: string) {
		handleClick({ sort: sortValue });
	}

	return (
		<>
			<div className="">
				<button
					onClick={() => handleClick(null)}
					type="button"
					className={`${
						query ?? '!bg-primary text-white'
					} w-full  text-xs px-6 py-2 rounded-3xl    dark:glass dark:border-none bg-gray-50 font-light text-black border btn`}>
					All
				</button>
			</div>

			<div className="">
				<button
					onClick={() => handleClick({ discount: 0 })}
					type="button"
					className={`${
						query?.discount === 0 && '!bg-primary text-white'
					} w-full flex gap-1 items-center  text-xs px-6 py-2 rounded-3xl  dark:glass dark:border-none bg-gray-50 font-light text-black border btn`}>
					<TbDiscount2Off /> No discount
				</button>
			</div>
			<Menu as="div" className=" inline-block text-left">
				<div>
					<Menu.Button className="w-full  flex gap-1 items-center  dark:glass dark:border-none  text-xs px-4 py-2 rounded-3xl  bg-gray-50 font-light text-black border btn">
						<LiaSortSolid />
						Sort
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95">
					<Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
						<div className="px-1 py-1 ">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() =>
											handleSortFilter('createdAt')
										}
										className="group text-black flex w-full gap-1  hover:glass items-center rounded-md px-2 py-2 text-sm">
										{active ? (
											<BsSortDown color="cadetblue" />
										) : (
											<BsSortDown color="cadetblue" />
										)}
										Sort By Date (Recent)
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() =>
											handleSortFilter('-createdAt')
										}
										className="group text-black  hover:glass gap-1 flex w-full items-center rounded-md px-2 py-2 text-sm">
										{active ? (
											<BsSortUp color="green" />
										) : (
											<BsSortUp color="green" />
										)}
										Sort By Date (Lowest)
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() =>
											handleSortFilter('regularPrice')
										}
										className="group text-black  hover:glass gap-1 flex w-full items-center rounded-md px-2 py-2 text-sm">
										{active ? (
											<BsSortUp color="green" />
										) : (
											<BsSortUp color="green" />
										)}
										Sort By Amount (Lowest)
									</button>
								)}
							</Menu.Item>
						</div>
						<div className="px-1 py-1">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() =>
											handleSortFilter('-regularPrice')
										}
										className="group flex text-black gap-1  hover:glass w-full items-center rounded-md px-2 py-2 text-sm">
										{active ? (
											<BsSortDown color="cadetblue" />
										) : (
											<BsSortDown color="cadetblue" />
										)}
										Sort By Amount (Highest)
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	);
};

export default CabinHeaderActions;
