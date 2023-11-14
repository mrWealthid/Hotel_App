import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import {
	fetchBookingsAfterDate,
	fetchDailyStats,
	fetchStaysAfterDate,
	handleCheckIn,
	handleCheckout,
	handleDeleteBookings
} from '../service/dashboard.service';

export interface IListResponse {
	isLoading: boolean;
	error: any;
	data: any[];
	totalRecords: number;
	results: number;
}

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

export function useRecentBookings(days: number) {
	const { isLoading, data, error } = useQuery({
		queryKey: ['recentBookings', days],
		queryFn: () => fetchBookingsAfterDate(days),
		keepPreviousData: true
	});

	return {
		bookingsLoading: isLoading,
		bookingsError: error,
		bookings: data?.data
	};
}
export function useRecentStays(days: number) {
	const { isLoading, data, error } = useQuery({
		queryKey: ['recentStays', days],
		queryFn: () => fetchStaysAfterDate(days),
		keepPreviousData: true
	});

	return {
		staysLoading: isLoading,
		staysError: error,
		stays: data?.data,
		numDays: days
	};
}
export function useDailyActivites() {
	const { isLoading, data, error } = useQuery({
		queryKey: ['dailyActivities'],
		queryFn: () => fetchDailyStats(),
		keepPreviousData: true
	});

	return {
		dailyLoading: isLoading,
		dailyError: error,
		daily: data?.data
	};
}

export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: (id: any) => handleDeleteBookings(id),
		onSuccess: () => {
			toast.success('Bookings successfully deleted');
			queryClient.invalidateQueries({
				queryKey: ['bookings']
			});
		},
		onError: (err: any) => toast.error(err.message)
	});

	return { isDeleting, deleteBooking };
}
export function useCheckOutBooking(id: any) {
	const queryClient = useQueryClient();
	const { isLoading: isCheckingOut, mutate: checkOutBooking } = useMutation({
		mutationFn: (payload: any) => handleCheckout(payload, id),
		onSuccess: () => {
			toast.success('Bookings checked-out successfully');
			queryClient.invalidateQueries({
				queryKey: ['dailyActivities']
			});
		},
		onError: (err: any) => toast.error(err.message)
	});

	return { isCheckingOut, checkOutBooking };
}
export function useCheckInBooking(id: any) {
	const queryClient = useQueryClient();
	const { isLoading: isCheckingIn, mutate: checkInBooking } = useMutation({
		mutationFn: (payload: any) => handleCheckIn(payload, id),
		onSuccess: () => {
			toast.success('Booking checked-in successfully');
			queryClient.invalidateQueries({
				queryKey: ['dailyActivities']
			});
		},
		onError: (err: any) => toast.error(err.message)
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
