import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCabins,
  handleCreateCabin,
  handleDelete,
  handleDuplicateCabin,
} from "../service/cabins.service";
import toast from "react-hot-toast";
import { TableResponse } from "@/components/table/models/table.model";
import { Cabin, CabinPayload } from "../model/cabin.model";
import { ApiError } from "@/components/shared/model/model";

export function useCabins(
  page: number = 1,
  limit: number = 10
): TableResponse<Cabin> {
  const { isLoading, data, error, isRefetching } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => fetchCabins(page, limit),
  });

  return {
    isLoading,
    error,
    data: data?.data,
    totalRecords: data?.totalRecords,
    results: data?.results,
    isRefetching,
  };
}

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDuplicating, mutate: duplicateCabin } = useMutation({
    mutationFn: (row: CabinPayload) => handleDuplicateCabin(row),
    onSuccess: () => {
      toast.success("Cabin successfully duplicated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: ApiError) => toast.error(err.message),
  });

  return { isDuplicating, duplicateCabin };
}

// export function invalidateQuery(key: any) {
// 	const queryClient = useQueryClient();

// 	queryClient.invalidateQueries({
// 		queryKey: [key]
// 	});
// }

export function useCreateCabin(
  isEditing: boolean,
  close?: () => void,
  cabinId?: string
) {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (payload: CabinPayload) =>
      handleCreateCabin(payload, isEditing, cabinId),
    onSuccess: () => {
      toast.success("Cabin successfully created...");

      close?.();
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: ApiError) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id: string) => handleDelete(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins", 5, 1, null],
      });
    },
    onError: (err: ApiError) => toast.error(err.message),
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
