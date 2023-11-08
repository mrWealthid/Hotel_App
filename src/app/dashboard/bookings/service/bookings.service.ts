import axios from 'axios';

export async function fetchBookings(
	page: number,
	limit: number,
	query: string | null
) {
	const url = query
		? `/api/bookings?limit=${limit}&page=${page}&${query}`
		: `/api/bookings?limit=${limit}&page=${page}`;
	try {
		const response = await axios(url);

		const data = await response.data;
		return data;
	} catch (err: any) {
		throw new Error(
			`Booking could not be loaded Status: ${err.response.status}`
		);
	}
}
export async function fetchGuests(query: string | null) {
	const url = query
		? `/api/guests/searchterm?name=${query}`
		: `/api/guests/searchterm`;
	try {
		const response = await axios(url);

		const data = await response.data;
		return data;
	} catch (err: any) {
		throw new Error(
			`Guest could not be loaded Status: ${err.response.status}`
		);
	}
}
export async function fetchCabins(query: string | null) {
	const url = query
		? `/api/cabins/searchterm?name=${query}`
		: `/api/cabins/searchterm`;
	try {
		const response = await axios(url);

		const data = await response.data;
		return data;
	} catch (err: any) {
		throw new Error(`Cabins could not loaded: ${err.response.status}`);
	}
}

export async function handleCreateBooking(
	data: any,
	booking: any,
	isEditing: any
) {
	try {
		const res = isEditing
			? await axios.patch(`/api/bookings/${booking.id}`, data)
			: await axios.post(`api/bookings`, data);

		const resData = await res.data;
		return resData;
	} catch (err: any) {
		throw new Error(
			`Booking could not be created Status: ${err.response.status}`
		);
	}
}

export async function handleDeleteBookings(id: any) {
	try {
		const res = await axios.delete(`/api/bookings/${id}`);

		const data = await res.data;
		return data;
	} catch (err: any) {
		throw new Error(
			`Booking could not be deleted Status: ${err.response.status}`
		);
	}
}

export async function handleCheckout(payload: any, id: any) {
	try {
		const res = await axios.patch(`/api/bookings/${id}`, payload);

		const data = await res.data;
		return data;
	} catch (err: any) {
		throw new Error(
			`Guest could not be checked out Status: ${err.response.status}`
		);
	}
}
