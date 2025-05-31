import BookingsRowActions from "./BookingsRowActions";
import { formatCurrency } from "@/utils/helpers";

function BookingRow({ data }: any) {
  function getStatusColor(val: string): string {
    let style = "";
    if (val === "UNCONFIRMED") {
      style = "bg-pending text-white";
    }
    if (val === "APPROVED") {
      style = "bg-success text-white";
    }
    if (val === "CHECKED_OUT") {
      style = "bg-gray-300";
    }

    if (val === "CHECKED_IN") {
      style = "bg-success text-white";
    }
    return style;
  }

  return (
    <>
      {data?.map((row: any, i: any) => {
        return (
          <tr
            key={i}
            className=" dark:border-none dark:text-white text-secondary relative border-b  "
          >
            {/* <td className="p-2 font-medium md:px-2 md:py-4 whitespace-nowrap">
							<input
								title="check"
								id="checkbox-all-search"
								type="checkbox"
								className="w-4 h-4 m-0 border-gray-300 rounded focus:ring-gray-500 "
							/>
							<label
								htmlFor="checkbox-all-search text-sm"
								className="sr-only">
								#
							</label>
						</td> */}
            <td className="p-2 font-medium md:px-2 md:py-4 whitespace-nowrap">
              <span>{i + 1}.</span>
            </td>
            <td>
              <span title={row.cabin.name} className="block  ellipsis-overflow">
                {row.cabin.name}
              </span>
            </td>
            <td>
              <span
                title={row.guests.name}
                className={
                  "text-sm font-semibold block ellipsis-overflow  mb-1  rounded-3xl"
                }
              >
                {row.guests.name}
              </span>
              <span
                title={row.guests.email}
                className={" ellipsis-overflow text-xs block"}
              >
                {row.guests.email}
              </span>
            </td>

            <td>
              <span className=" block ellipsis-overflow" title={row.totalPrice}>
                {formatCurrency(row.totalPrice)}
              </span>
            </td>
            <td>
              <span
                className={` ${getStatusColor(
                  row.checkStatus
                )} text-[8px] md:text-xs text-white py-2 px-3 rounded-3xl inline-flex`}
              >
                {row.checkStatus}
              </span>
            </td>
            <td>
              <span className="flex justify-center gap-2 flex-col">
                <span className="font-bold">{row.numNights} Night(s)</span>

                <span
                  title={new Date(row.endDate).toDateString()}
                  className="flex  text-[8px]  md:text-[10px] gap-1"
                >
                  <span>{new Date(row.startDate).toDateString()} ➡️</span>

                  <span> {new Date(row.endDate).toDateString()}</span>
                </span>
              </span>
            </td>

            <BookingsRowActions rowData={row} />
          </tr>
        );
      })}
    </>
  );
}

export default BookingRow;
