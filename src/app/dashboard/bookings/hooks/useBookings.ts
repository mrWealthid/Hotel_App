import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  handleCheckout,
  handleCreateBooking,
  handleDeleteBookings,
} from "../service/bookings.service";
import { BookingPayload } from "../model/booking.model";

export function useCreateBooking(
  bookingId: string,
  isEditing: boolean,
  close: () => void
) {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createBooking } = useMutation({
    mutationFn: (payload: BookingPayload) =>
      handleCreateBooking(payload, bookingId, isEditing),
    onSuccess: () => {
      toast.success("Bookings successfully created...");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      close();
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  return { isCreating, createBooking };
}
// export function useBookings(page: number, limit: number): IListResponse {
// 	const { isLoading, data, error } = useQuery({
// 		queryKey: ['bookings'],
// 		queryFn: () => fetchBookings(page, limit)
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
export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id: string) => handleDeleteBookings(id),
    onSuccess: () => {
      toast.success("Bookings successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
export function useCheckOutBooking(id: string) {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkOutBooking } = useMutation({
    mutationFn: (payload: any) => handleCheckout(payload, id),
    onSuccess: () => {
      toast.success("Bookings checked-out successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isCheckingOut, checkOutBooking };
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
