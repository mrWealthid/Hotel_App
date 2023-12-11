import axios from 'axios';

export async function fetchBookingsAfterDate(days: number) {
	const url = `/api/bookings/stats?days=${days}`;

	try {
		const response = await axios(url);

		return await response.data;
	} catch (err: any) {
		throw new Error(`HTTP error! Status: ${err.status}`);
	}
}
export async function fetchStaysAfterDate(days: number) {
	const url = `/api/stays?days=${days}`;

	try {
		const response = await axios(url);
		return await response.data;
	} catch (err: any) {
		throw new Error(`HTTP error! Status: ${err.status}`);
	}
}

export async function fetchDailyStats() {
	const url = '/api/today';

	try {
		const response = await axios(url);
		return await response.data;
	} catch (err: any) {
		throw new Error(`Failed to fetch! Status: ${err.status}`);
	}
}

export async function handleDeleteBookings(id: any) {
	try {
		const res = await axios.delete(`/api/bookings/${id}`);
		return await res.data;
	} catch (err: any) {
		throw new Error(`Cabin could not be created Status: ${err.status}`);
	}
}

export async function handleCheckout(payload: any, id: any) {
	try {
		const res = await axios.patch(`/api/bookings/${id}`, payload);
		return await res.data;
	} catch (err: any) {
		throw new Error(`Guest could not be checked out Status: ${err.status}`);
	}
}
export async function handleCheckIn(payload: any, id: any) {
	try {
		const res = await axios.patch(`/api/bookings/${id}`, payload);
		return await res.data;
	} catch (err: any) {
		throw new Error(`Guest could not be checked in Status: ${err.status}`);
	}
}
export async function createPaymentSession(bookingId: any) {
	try {
		const res = await axios(`/api/payment/${bookingId}`);
		const data = await res.data;

		const { url } = data.session;

		return url;
		// window.open(data.session.url, 'blank');
	} catch (err: any) {
		throw new Error(`Payment session could not be created: ${err.status}`);
	}
}
