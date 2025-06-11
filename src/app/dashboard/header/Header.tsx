import React, { FC } from "react";
import Profile from "../profile/Profile";
import Link from "next/link";
import SwitchToggle from "@/components/shared/switch/SwitchToggle";

import Logout from "./Logout";

const Header: FC = async () => {
  return (
    <div className="py-4 px-4   card text-sm  items-center   w-full flex justify-end gap-3 text-black dark:text-white">
      <Profile />
      <SwitchToggle />
      {/* <Link href={'/dashboard/account'}>Account</Link> */}
      <Logout />
    </div>
  );
};

export default Header;
