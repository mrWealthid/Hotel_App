import SideBar from '@/components/ui/SideBar';

export default function DashboardLayout({
	children // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<section className="flex">
				<section className="w-1/5">
					<SideBar />
				</section>

				<section className="w-4/5 flex flex-col ">
					<section className="py-5 px-2 bg-white">
						<h1>Header</h1>
					</section>
					<section> {children}</section>
				</section>
			</section>
		</section>
	);
}
