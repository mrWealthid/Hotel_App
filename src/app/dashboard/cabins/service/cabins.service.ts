export async function fetchCabins(
	page: number,
	limit: number,
	search: string | null
) {
	const url = !search
		? `http://localhost:3000/api/cabins?limit=${limit}&page=${page}`
		: `http://localhost:3000/api/cabins?limit=${limit}&page=${page}&${search}`;
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (err) {
		console.log(err);
	}
}

export async function handleDelete(id: any) {
	try {
		const res = await fetch(
			`http://localhost:3000/api/cabins/${id}`,

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

export async function handleDuplicateCabin(rowData: any, close?: any) {
	const { _id, id, ...rest } = rowData;

	try {
		const res = await fetch(
			`http://localhost:3000/api/cabins`,

			{
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				body: JSON.stringify(rest) // body data type must match "Content-Type" header
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

// export async function getCabins() {
// 	const { data, error } = await supabase.from('cabins').select('*');

// 	if (error) {
// 		console.error(error);
// 		throw new Error('Cabins could not be loaded');
// 	}

// 	return data;
// }
