import GuestsRowActions from "./GuestRowActions";
import { formatCurrency } from "@/utils/helpers";

function GuestsRow({ data }: any) {
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
              <span title={row.name} className="block  ellipsis-overflow">
                {row.name}
              </span>
            </td>
            <td>
              <span title={row.email} className="block  ellipsis-overflow">
                {row.email}
              </span>
            </td>

            <td>
              <span
                className=" block ellipsis-overflow"
                title={row.nationality}
              >
                {row.nationality}
              </span>
            </td>

            <GuestsRowActions rowData={row} />
          </tr>
        );
      })}
    </>
  );
}

export default GuestsRow;
