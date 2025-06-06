"use client";

import React, { FC, useState } from "react";
import { TbShieldCheck, TbShieldQuestion } from "react-icons/tb";
import { ImExit } from "react-icons/im";
import {
  BookingFilterQuery,
  BookingQueryprops,
  CheckStatus,
} from "../model/booking.model";

const BookingsHeaderActions: FC<BookingQueryprops> = ({ handleFilter }) => {
  const [query, setQuery] = useState<BookingFilterQuery | null>(null);

  async function handleClick(query: { checkStatus: string } | null) {
    setQuery(query);
    if (handleFilter) {
      query ? handleFilter(query) : handleFilter(null);
    }
  }

  return (
    <>
      <div>
        <button
          onClick={() => handleClick(null)}
          type="button"
          className={`${
            query ?? "!bg-primary text-white"
          } w-full  text-xs px-6 py-2 rounded-3xl   dark:glass dark:border-none bg-gray-50 font-light text-black border btn`}
        >
          All
        </button>
      </div>

      <div>
        <button
          onClick={() => handleClick({ checkStatus: CheckStatus.CHECKED_IN })}
          type="button"
          className={`${
            query?.checkStatus === CheckStatus.CHECKED_IN &&
            "!bg-primary text-white"
          } w-full  text-xs px-6 py-2 flex gap-1 items-center rounded-3xl  bg-gray-50  dark:glass dark:border-none font-light text-black border btn`}
        >
          <TbShieldCheck />
          Checked In
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            handleClick({
              checkStatus: CheckStatus.CHECKED_OUT,
            })
          }
          type="button"
          className={`${
            query?.checkStatus === CheckStatus.CHECKED_OUT &&
            "!bg-primary text-white"
          } w-full flex gap-1 items-center  text-xs px-6 py-2 rounded-3xl  dark:glass dark:border-none bg-gray-50 font-light text-black border btn`}
        >
          <ImExit />
          Checked-Out
        </button>
      </div>

      <div>
        <button
          onClick={() =>
            handleClick({
              checkStatus: CheckStatus.UNCONFIRMED,
            })
          }
          type="button"
          className={`${
            query?.checkStatus === CheckStatus.UNCONFIRMED &&
            "!bg-primary text-white"
          } w-full  text-xs px-6 py-2 flex items-center gap-1 rounded-3xl  dark:glass dark:border-none  bg-gray-50 font-light text-black border btn`}
        >
          <TbShieldQuestion />
          Un-Confirmed
        </button>
      </div>
      {/*
			<select
				id="sort"
				name="sort"
				title="sortdropdown"
				className="text-xs font-light text-gray-900 focus-within:ring-0 focus-within:border-none border border-gray-300 bg-gray-50 rounded">
				<option value="">Sort By Amount(Highest)</option>
				<option value="">Sort By Amount(Lowest)</option>
				<option value="">Sort By Date(Recent)</option>
				<option value="">Sort By Date(Lowest)</option>
			</select> */}
    </>
  );
};

export default BookingsHeaderActions;
