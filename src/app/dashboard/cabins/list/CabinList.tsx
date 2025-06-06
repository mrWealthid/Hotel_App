"use client";
import Table from "@/components/table/Table";
import CabinRowActions from "./CabinRowActions";
import CabinHeaderActions from "./CabinHeaderActions";
import { Icolumn } from "@/components/table/models/table.model";
import { fetchCabins } from "../service/cabins.service";
import { Cabin } from "../model/cabin.model";

const CabinList = () => {
  // const cabins = await getData('/api/cabins', 'cabins', 'no-discount');

  const columns: Icolumn[] = [
    { header: "image", accessor: "image" },
    { header: "name", accessor: "name", searchType: "TEXT" },
    { header: "capacity", accessor: "maxCapacity", searchType: "NUMBER" },
    {
      header: "price",
      accessor: "regularPrice",
      custom: { type: "currency" },
      searchType: "NUMBER",
    },
    {
      header: "discount",
      accessor: "discount",
      custom: { type: "percent" },
      searchType: "NUMBER",
    },
  ];

  return (
    <Table<Cabin>
      service={fetchCabins}
      queryKey="cabins"
      headerActions={<CabinHeaderActions />}
      columns={columns}
    >
      <Table.TableHeader />
      <Table.TableRow<Cabin>>
        <CabinRowActions />
      </Table.TableRow>
    </Table>
  );
};

export default CabinList;
