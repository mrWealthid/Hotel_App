import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	fetchCabins,
	handleDelete,
	handleDuplicateCabin
} from '../service/cabins.service';
import toast from 'react-hot-toast';

export interface IListResponse {
	isLoading: boolean;
	error: any;
	data: any[];
	totalRecords: number;
	results: number;
}

export function useCabins(
	page: number,
	limit: number,
	singleSearch: any
): IListResponse {
	const { isLoading, data, error } = useQuery({
		queryKey: ['cabins'],
		queryFn: () => fetchCabins(page, limit)
	});

	return {
		isLoading,
		error,
		data: data?.data,
		totalRecords: data?.totalRecords,
		results: data?.results
	};
}

export function useDuplicateCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isDuplicating, mutate: duplicateCabin } = useMutation({
		mutationFn: (row: any) => handleDuplicateCabin(row),
		onSuccess: () => {
			toast.success('Cabin successfully duplicated');
			queryClient.invalidateQueries({
				queryKey: ['cabins']
			});
		},
		onError: (err: any) => toast.error(err.message)
	});

	return { isDuplicating, duplicateCabin };
}
export function useDeleteCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: (id: any) => handleDelete(id),
		onSuccess: () => {
			toast.success('Cabin successfully deleted');
			queryClient.invalidateQueries({
				queryKey: ['cabins']
			});
		},
		onError: (err: any) => toast.error(err.message)
	});

	return { isDeleting, deleteCabin };
}

// export function useDeleteCabin(id: number) {
// 	const queryClient = useQueryClient();

// 	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
// 		mutationFn: () => handleDelete(id),
// 		onSuccess: () => {
// 			toast.success('Cabin successfully deleted');

// 			queryClient.invalidateQueries({
// 				queryKey: ['cabins']
// 			});
// 		},
// 		onError: (err: any) => toast.error(err.message)
// 	});

// 	return { isDeleting, deleteCabin };
// }
