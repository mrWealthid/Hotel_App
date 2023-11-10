import { Tab } from '@headlessui/react';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

interface ITab {
	title: string;
	order: number;
}

export default function TabComponent({ tabData, updateOrder }: any) {
	// const result = Object.groupBy(inventory, ({ type }) => type);
	return (
		<div className="w-full max-w-md px-2 p-2 mb-2 sm:px-0">
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
					{tabData.map((tab: ITab) => (
						<Tab
							key={tab.order}
							onClick={() => updateOrder(tab.order)}
							className={({ selected }) =>
								classNames(
									'w-full rounded-lg py-2.5 text-xs font-medium leading-5 text-primary dark:text-white',
									'ring-white/60   focus:outline-none ',
									selected
										? 'bg-white dark:glass shadow'
										: 'text-primary dark:text-white hover:bg-white/[0.12] hover:text-white'
								)
							}>
							{tab.title}
						</Tab>
					))}
				</Tab.List>
			</Tab.Group>
		</div>
	);
}
