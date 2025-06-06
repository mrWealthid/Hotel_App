import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IListResponse, TableResponse } from "../models/table.model";

export function useTable<T>(
  page: number,
  limit: number,
  service: (
    page: number,
    limit: number,
    search?: string
  ) => Promise<TableResponse<T>>,
  queryKey: string,
  search?: string
): TableResponse<T> {
  const { isLoading, data, error, isRefetching } = useQuery<TableResponse<T>>({
    queryKey: [queryKey, limit, page, search],
    queryFn: () => service(page, limit, search),
    keepPreviousData: true,
  });

  return {
    isLoading,
    isRefetching,
    error,
    data: data?.data ?? [],
    totalRecords: data?.totalRecords ?? 0,
    results: data?.results ?? 0,
  };
}

// export function usePaginate(
// 	page: number,

// 	service: any,
// 	queryKey: string
// ) {
// 	const queryClient = useQueryClient();
// 	const { isLoading: isPaginating, mutate: paginate }: any = useMutation({
// 		mutationFn: (limit) => service(page, limit),
// 		onSuccess: () => {
// 			// toast.success('Bookings checked-out successfully');
// 			queryClient.invalidateQueries({
// 				queryKey: [queryKey]
// 			});
// 		},
// 		onError: (err: any) => toast.error(err.message)
// 	});

// 	return {
// 		isPaginating,
// 		paginate
// 	};
// }

// function handlePaginate(val: number, limit: number) {
// 	// setPage(val);
// 	// setLimit(limit);
// 	// fetchTableData(val, limit);
// }
