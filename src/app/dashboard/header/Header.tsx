import React from "react";
import Profile from "../profile/Profile";
import Link from "next/link";
import SwitchToggle from "@/components/shared/Switch/SwitchToggle";

import Logout from "./Logout";

const Header = async () => {
  return (
    <div className="py-4 px-4   bg-white text-sm  items-center   w-full flex justify-end gap-3 text-black dark:text-white">
      <Profile />
      <SwitchToggle />
      {/* <Link href={'/dashboard/account'}>Account</Link> */}
      <Logout />
    </div>
  );
};

export default Header;
