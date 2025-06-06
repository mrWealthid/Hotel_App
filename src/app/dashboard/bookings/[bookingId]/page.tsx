import { findData, getData } from "@/utils/apiRequests";
import Link from "next/link";
import React, { FC } from "react";
import { formatCurrency, getStatusColor } from "@/utils/helpers";
import { ViewBookingProps } from "../model/booking.model";

const page: FC<ViewBookingProps> = async ({ params }) => {
  const bookingId = params.bookingId;

  const { data } = await findData("api/bookings", bookingId);
  const { data: settings } = await getData("api/settings", "settings");
  // const { data: user } = (await getData('api/users/me', 'profile')) || {};

  // console.log(user);

  return (
    <section className="flex  flex-col gap-3">
      <section className="flex justify-between items-center">
        <section className="flex items-center gap-4">
          <h1 className="title"> Booking Details </h1>
          <span
            className={` ${getStatusColor(
              data.checkStatus
            )} text-xs text-white py-2 px-3 rounded-3xl inline-flex`}
          >
            {data.checkStatus}
          </span>
        </section>

        <Link
          className="bg-primary text-sm dark:glass disabled:bg-primary-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-3xl"
          href={"../"}
        >
          Back
        </Link>
      </section>

      <div className="text-sm bg-white flex pb-3 flex-col gap-2">
        <section className="bg-primary flex justify-between text-white py-6 px-4">
          <section className="flex items-center gap-1">
            <span>Icon</span>
            <span>{data.numNights} Night(s) in</span>
            <span className="font-medium">{data.cabin?.name}</span>
          </section>
          <section className="flex gap-3">
            <span className="flex  text-xs gap-2">
              <span>{new Date(data.startDate).toDateString()} ➡️</span>

              <span> {new Date(data.endDate).toDateString()}</span>
            </span>
          </section>
        </section>

        <section className="flex flex-col px-3 py-2 gap-2">
          <section className="flex gap-2">
            <section className="font-medium">
              {data.guests?.name} + {data.numGuests} guest
            </section>
            <section className="font-medium">· {data.guests?.email}</section>
            <section>· National ID {data.guests?.nationalId} </section>
          </section>

          <section className="font-medium">
            <span>Breakfast Included? {data.hasBreakfast ? "Yes" : "No"}</span>
          </section>
        </section>

        <section className="bg-primary-lighter py-6 flex justify-between px-4 m-3">
          <section className="flex gap-2">
            <span>Total price</span>
            <span>
              {formatCurrency(data.totalPrice)} (
              {formatCurrency(data.cabinPrice)} cabin +{" "}
              {formatCurrency(settings.breakfastPrice)} breakfast ){" "}
            </span>
          </section>
          <section> {data.isPaid ? "PAID" : "Will pay on arrival"}</section>
        </section>

        <section className="flex items-center gap-3 justify-end px-4">
          {data.checkStatus === "UNCONFIRMED" && (
            <div>
              <Link
                href={`/dashboard/checkin/${data.id}`}
                type="button"
                className=" bg-primary text-white px-4 py-2 rounded-3xl"
              >
                Check-In
              </Link>
            </div>
          )}

          <span>Booked, {new Date(data.createdAt).toDateString()}</span>
        </section>
      </div>
    </section>
  );
};

export default page;
