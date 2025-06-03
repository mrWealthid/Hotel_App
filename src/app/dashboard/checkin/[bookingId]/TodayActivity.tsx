import React, { useState } from "react";
import TodayItem from "./TodayItem";
import ReceiptPopup from "@/components/shared/modal/ReceiptPopup";
import Image from "next/image";

const TodayActivity = ({ daily }: any) => {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState(null);

  function handlePopup() {
    setOpen(true);
  }

  function renderBookings() {
    if (daily?.length < 1) {
      return (
        // <p className="  text-xs   dark:glass p-3 dark:rounded   items-center  ">
        // 	No Data Available
        // </p>

        <div className="flex w-full flex-col items-center gap-1">
          <Image
            width={120}
            height={80}
            alt="empty"
            src={"/images/empty.svg"}
          />

          <p className="italic text-xs sm:text-sm">No Bookings Yet!</p>
        </div>
      );
    }
    if (daily?.length >= 1) {
      return daily?.map((activity: any) => (
        <TodayItem
          handlePopup={handlePopup}
          processActivity={setActivity}
          key={activity._id}
          activity={activity}
          {...activity}
        />
      ));
    }
  }

  return (
    <div className=" flex flex-col gap-2 ">
      <section className="  h-40 overflow-auto">{renderBookings()}</section>

      {open && (
        <ReceiptPopup activity={activity} open={open} setOpen={setOpen} />
      )}
    </div>
  );
};

export default TodayActivity;
