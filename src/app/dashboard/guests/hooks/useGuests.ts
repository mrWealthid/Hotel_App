import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  fetchGuests,
  handleCheckout,
  handleCreateGuest,
  handleDeleteGuests,
} from "../service/guests.service";
import { ApiError } from "@/components/shared/model/model";
import { GuestPayload } from "../model/guest.model";

export function useCreateGuest(GuestId: any, isEditing: any, close: any) {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createGuest } = useMutation({
    mutationFn: (payload: GuestPayload) =>
      handleCreateGuest(payload, GuestId, isEditing),
    onSuccess: () => {
      toast.success(
        `Guests ${isEditing ? "Updated" : "Created"} Successfully...`
      );
      queryClient.invalidateQueries({
        queryKey: ["Guests"],
      });

      close();
    },
    onError: (err: ApiError) => toast.error(err.message),
  });

  return { isCreating, createGuest };
}
// export function useGuests(page: number, limit: number): IListResponse {
// 	const { isLoading, data, error } = useQuery({
// 		queryKey: ['Guests'],
// 		queryFn: () => fetchGuests(page, limit)
// 	});

// 	return {
// 		isLoading,
// 		error,
// 		data: data?.data,
// 		totalRecords: data?.totalRecords,
// 		results: data?.results
// 	};
// }

// export function useDuplicateCabin() {
// 	const queryClient = useQueryClient();

// 	const { isLoading: isDuplicating, mutate: duplicateCabin } = useMutation({
// 		mutationFn: (row: any) => handleDuplicateCabin(row),
// 		onSuccess: () => {
// 			toast.success('Cabin successfully duplicated');
// 			queryClient.invalidateQueries({
// 				queryKey: ['cabins']
// 			});
// 		},
// 		onError: (err: any) => toast.error(err.message)
// 	});

// 	return { isDuplicating, duplicateCabin };
// }
export function useDeleteGuest() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteGuest } = useMutation({
    mutationFn: (id: string) => handleDeleteGuests(id),
    onSuccess: () => {
      toast.success("Guests successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["Guests"],
      });
    },
    onError: (err: ApiError) => toast.error(err.message),
  });

  return { isDeleting, deleteGuest };
}
// export function useCheckOutGuest(id: any) {
// 	const queryClient = useQueryClient();
// 	const { isLoading: isCheckingOut, mutate: checkOutGuest } = useMutation({
// 		mutationFn: (payload: any) => handleCheckout(payload, id),
// 		onSuccess: () => {
// 			toast.success('Guests checked-out successfully');
// 			queryClient.invalidateQueries({
// 				queryKey: ['Guests']
// 			});
// 		},
// 		onError: (err: any) => toast.error(err.message)
// 	});

// 	return { isCheckingOut, checkOutGuest };
// }

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
