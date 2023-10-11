import { IListResponse } from '@/app/dashboard/cabins/hooks/useCabins';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useTable(
	page: number,
	limit: number,
	service: any,
	queryKey: string,
	singleSearch?: any
): IListResponse {
	const { isLoading, data, error } = useQuery({
		queryKey: [queryKey, limit, page, singleSearch],
		queryFn: () => service(page, limit, singleSearch),
		keepPreviousData: true
	});
	console.log('hooks', singleSearch);

	return {
		isLoading,
		error,
		data: data?.data,
		totalRecords: data?.totalRecords,
		results: data?.results
	};
}

export function usePaginate(
	page: number,

	service: any,
	queryKey: string
) {
	const queryClient = useQueryClient();
	const { isLoading: isPaginating, mutate: paginate }: any = useMutation({
		mutationFn: (limit) => service(page, limit),
		onSuccess: () => {
			// toast.success('Bookings checked-out successfully');
			queryClient.invalidateQueries({
				queryKey: [queryKey]
			});
		},
		onError: (err: any) => toast.error(err.message)
	});

	return {
		isPaginating,
		paginate
	};
}

// function handlePaginate(val: number, limit: number) {
// 	// setPage(val);
// 	// setLimit(limit);
// 	// fetchTableData(val, limit);
// }
