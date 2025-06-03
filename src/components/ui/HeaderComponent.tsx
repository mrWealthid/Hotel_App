import Link from "next/link";
import React from "react";
import NavigationComponent, {
  IRoute,
} from "../shared/navigation/Navigation-component";

export const HeaderComponent = () => {
  // const routes: IRoute[] = [
  // 	{ name: 'Home', path: '/' },
  // 	{ name: 'Who We Are', path: '/' },
  // 	{ name: 'Sermon', path: '/' },
  // 	{ name: 'Request Prayer', path: '/' },
  // 	{ name: 'Contact Us', path: '/contact' }
  // ];
  const routes: IRoute[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    // { name: 'Sermon', path: '/' },
  ];

  return (
    <div className="flex py-4     z-50 glass  container-text fixed w-full items-center justify-between">
      <h1>Logo</h1>

      <nav className="items-center hidden lg:flex gap-3">
        <NavigationComponent nav={routes} />
      </nav>
    </div>
  );
};
