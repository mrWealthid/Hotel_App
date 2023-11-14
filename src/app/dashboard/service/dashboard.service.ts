import axios from 'axios';

export async function fetchBookingsAfterDate(days: number) {
	const url = `/api/bookings/stats?days=${days}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return await response.json();
	} catch (err) {
		console.log(err);
	}
}
export async function fetchStaysAfterDate(days: number) {
	const url = `/api/stays?days=${days}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return await response.json();
	} catch (err) {
		console.log(err);
	}
}

export async function fetchDailyStats() {
	const url = `/api/bookings/daily`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return await response.json();
	} catch (err) {
		console.log(err);
	}
}

export async function handleDeleteBookings(id: any) {
	try {
		const res = await fetch(
			`/api/bookings/${id}`,

			{
				method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
				// body data type must match "Content-Type" header
			}
		);

		if (!res.ok) {
			throw new Error(`Cabin could not be created Status: ${res.status}`);
		}

		return res.json(); // parses JSON response into native JavaScript objects
	} catch (err) {
		console.log(err);
	}
}

export async function handleCheckout(payload: any, id: any) {
	try {
		const res = await fetch(`/api/bookings/${id}`, {
			method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
			body: JSON.stringify(payload) // body data type must match "Content-Type" header
		});

		if (!res.ok) {
			throw new Error(
				`Guest could not be checked out Status: ${res.status}`
			);
		}

		return await res.json(); // parses JSON response into native JavaScript objects
	} catch (err) {
		console.log(err);
	}
}
export async function handleCheckIn(payload: any, id: any) {
	try {
		const res = await axios.patch(`/api/bookings/${id}`, payload);
	} catch (err: any) {
		throw new Error(`Guest could not be checked out Status: ${err.status}`);
	}
}
