import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  fetchBookingsAfterDate,
  fetchDailyStats,
  fetchStaysAfterDate,
  handleCheckIn,
  handleCheckout,
  handleDeleteBookings,
} from "../service/dashboard.service";
import { ApiError } from "@/components/shared/model/model";
import { Booking, BookingPayload } from "../bookings/model/booking.model";

// export interface IListResponse {
//   isLoading: boolean;
//   error: any;
//   data: any[];
//   totalRecords: number;
//   results: number;
// }

// export function useBookings(page: number, limit: number): IListResponse {
// 	const { isLoading, data, error } = useQuery({
// 		queryKey: ['bookings'],
// 		queryFn: () => fetchBookingsAfterDate(page, limit)
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

export function useRecentBookings<T>(days: number): RecentBookingsResponse<T> {
  const { isLoading, data, error } = useQuery({
    queryKey: ["recentBookings", days],
    queryFn: () => fetchBookingsAfterDate(days),
    keepPreviousData: true,
  });

  return {
    bookingsLoading: isLoading,
    bookingsError: error,
    bookings: data?.data,
  };
}
export function useRecentStays<T>(days: number): RecentStaysResponse<T> {
  const { isLoading, data, error } = useQuery({
    queryKey: ["recentStays", days],
    queryFn: () => fetchStaysAfterDate(days),
    keepPreviousData: true,
  });

  return {
    staysLoading: isLoading,
    staysError: error,
    stays: data?.data,
    numDays: days,
  };
}
export function useDailyActivites<T>(): DailyActivitiesResponse<T> {
  const { isLoading, data, error } = useQuery({
    queryKey: ["daily"],
    queryFn: () => fetchDailyStats(),
    keepPreviousData: true,
  });

  return {
    dailyLoading: isLoading,
    dailyError: error,
    daily: data?.data,
  };
}

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
    onError: (err: ApiError) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
export function useCheckOutBooking(id: string) {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkOutBooking } = useMutation({
    mutationFn: (payload: Partial<BookingPayload>) =>
      handleCheckout(payload, id),
    onSuccess: () => {
      toast.success("Bookings checked-out successfully");
      queryClient.invalidateQueries({
        queryKey: ["daily"],
      });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isCheckingOut, checkOutBooking };
}
export function useCheckInBooking(id: string) {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingIn, mutate: checkInBooking } = useMutation({
    mutationFn: (payload: Partial<BookingPayload>) =>
      handleCheckIn(payload, id),
    onSuccess: () => {
      toast.success("Booking checked-in successfully");
      queryClient.invalidateQueries({
        queryKey: ["dailyActivities"],
      });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isCheckingIn, checkInBooking };
}
export function usePrintReciept(id: string) {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingIn, mutate: checkInBooking } = useMutation({
    mutationFn: (payload: Partial<BookingPayload>) =>
      handleCheckIn(payload, id),
    onSuccess: () => {
      toast.success("Booking checked-in successfully");
      queryClient.invalidateQueries({
        queryKey: ["dailyActivities"],
      });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isCheckingIn, checkInBooking };
}
export function useEmailReciept(id: string) {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingIn, mutate: checkInBooking } = useMutation({
    mutationFn: (payload: Partial<BookingPayload>) =>
      handleCheckIn(payload, id),
    onSuccess: () => {
      toast.success("Booking checked-in successfully");
      queryClient.invalidateQueries({
        queryKey: ["dailyActivities"],
      });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isCheckingIn, checkInBooking };
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

interface RecentBookingsResponse<T> {
  bookingsLoading: boolean;
  bookingsError: unknown;
  bookings: T[];
}

interface RecentStaysResponse<T> {
  staysLoading: boolean;
  staysError: unknown;
  stays: T[];
  numDays: number;
}

interface DailyActivitiesResponse<T> {
  dailyLoading: boolean;
  dailyError: unknown;
  daily: T[];
}
