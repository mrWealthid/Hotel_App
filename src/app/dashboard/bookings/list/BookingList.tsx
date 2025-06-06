"use client";
import Table from "@/components/table/Table";
import BookingHeaderActions from "./BookingsHeaderActions";
import { Icolumn } from "@/components/table/models/table.model";
import BookingRow from "./BookingRow";
import { fetchBookings } from "../service/bookings.service";
import { FC } from "react";
import { Booking } from "../model/booking.model";

const BookingsList: FC = () => {
  // const cabins = await getData('/api/cabins', 'cabins', 'no-discount');

  const columns: Icolumn[] = [
    { header: "cabin", accessor: "cabin.name", searchType: "TEXT" },
    {
      header: "guest",
      accessor: "guests.name",
      searchType: "TEXT",
      filterKey: "guests",
    },
    { header: "amount", accessor: "totalPrice", searchType: "NUMBER" },
    {
      header: "status",
      accessor: "checkStatus",
      searchType: "DROPDOWN",
      filterKey: "checkStatus",
    },

    {
      header: "Dates",
      accessor: "",
    },
  ];

  return (
    <div className="h-80">
      <Table<Booking>
        service={fetchBookings}
        queryKey="bookings"
        headerActions={<BookingHeaderActions />}
        columns={columns}
      >
        <Table.TableHeader />
        <Table.TableRow<Booking> customRow={true}>
          <BookingRow />
        </Table.TableRow>
      </Table>
    </div>
  );
};

export default BookingsList;
