export async function fetchBookings(
	page: number,
	limit: number,
	query: string | null
) {
	console.log('service', query);
	const url = query
		? `/api/bookings?limit=${limit}&page=${page}&${query}`
		: `/api/bookings?limit=${limit}&page=${page}`;
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
export async function fetchGuests(query: string | null) {
	console.log('service', query);
	const url = query
		? `/api/guests/searchterm?name=${query}`
		: `/api/guests/searchterm`;
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
export async function fetchCabins(query: string | null) {
	console.log('service', query);
	const url = query
		? `/api/cabins/searchterm?name=${query}`
		: `/api/cabins/searchterm`;
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

// export async function getCabins() {
// 	const { data, error } = await supabase.from('cabins').select('*');

// 	if (error) {
// 		console.error(error);
// 		throw new Error('Cabins could not be loaded');
// 	}

// 	return data;
// }
