import React from 'react';

const SideBar = () => {
	return (
		<div className="flex flex-col  min-h-screen gap-22 bg-[#1F295A] text-white py-8">
			<p className="flex justify-center space-x-4 text-white">Logo</p>
			<section className="flex flex-col bg-inherit  mt-10 px-2">
				<p>Booking</p>
				<p>Users</p>

				{/* {routes.map((route, index) => (
					<NavLink
						style={({ isActive }: any) => addStyle(isActive)}
						to={route.path}
						key={route.text}
						end={index === 0 && true}
						className={
							'hover:translate-x-1 text-sm transition-all duration-500 flex items-center gap-2'
						}>
						<img src={route.icon} alt={route.text} />
						{route.text}
					</NavLink>
				))} */}
			</section>
		</div>
	);
};

export default SideBar;
