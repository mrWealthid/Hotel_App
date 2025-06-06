import React, { FC } from "react";
import AddGuest from "./AddGuest";
import GuestList from "./list/GuestList";

const Page: FC = async () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="title"> All Guests </h1>

        <AddGuest />
      </div>

      <GuestList />
    </div>
  );
};

export default Page;
