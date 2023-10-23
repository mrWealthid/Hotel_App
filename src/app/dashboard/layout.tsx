import SideBar from '@/components/ui/SideBarComponent';
import Header from './header/Header';

export default function DashboardLayout({
	children // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="min-h-screen">
			{/* Name */}

			<Header />
			<section>
				<SideBar />
			</section>
			{/* <button
				data-drawer-target="default-sidebar"
				data-drawer-toggle="default-sidebar"
				aria-controls="default-sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
				</svg>
			</button> */}

			<section className=" sm:ml-64 flex flex-col h-screen gap-6 ">
				{/* <section className="py-5  pl-16 sm:pl-5 z-10   w-full fixed container-text bg-white">
					<Header />
				</section> */}
				<section className="container-text mt-5 ">{children}</section>
			</section>
		</section>
	);
}
