export async function handleCheckout(payload: any, id: any) {
	try {
		const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
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



// export async function fetchCabins(page: number, limit: number) {
// 	try {
// 		const response = await fetch(
// 			`http://localhost:3000/api/cabins?limit=${limit}&page=${page}`
// 		);

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`);
// 		}

// 		const data = await response.json();

// 		return data;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }