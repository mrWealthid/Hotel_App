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

			<section className=" sm:ml-64 flex flex-col h-screen gap-6 ">
				<section className="container-text mt-5 ">{children}</section>
			</section>
		</section>
	);
}
