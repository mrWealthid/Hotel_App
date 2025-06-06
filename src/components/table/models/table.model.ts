export interface ITable {
  queryKey: string;
  children: React.ReactNode;
  columns: Icolumn[];
  headerActions?: React.ReactNode;
  limit?: number;
  service: any;
  actionable?: boolean;
  isDownloadable?: boolean;
}

export interface ITableRow<T> {
  children: React.ReactElement<{ rowData: TableConfig; data?: T }>;
  customRow?: boolean;
}
// export interface ITableHeaderAction {
//   children: React.ReactElement<{
//     handleFilter: (val: { key: string; value: string | number } | null) => void;
//   }>;
//   handleFilter?: (val: { key: string; value: string | number } | null) => void;
//   customRow?: boolean;
// }

interface TableConfig {
  actionable?: boolean;
  checkable?: boolean;
}

export interface Icolumn {
  header: string;
  accessor: string;
  key?: string;
  custom?: {
    type: string;
    suffix?: string;
    prefix?: string;
    bolden?: boolean;
  };
  searchType?: "TEXT" | "DROPDOWN" | "NUMBER";
  selectOptions?: Object[];
  filterKey?: string;
}

export interface TableResponse<T> extends IListResponse<T> {
  isLoading: boolean;
  error: string | unknown;
  isRefetching: boolean;
}

export interface IListResponse<T> {
  data: T[];
  totalRecords: number;
  results: number;
  status?: string;
}
