export async function fetchUsers(
	page: number,
	limit: number,
	search: string | null
) {
	const url = !search
		? `/api/users?limit=${limit}&page=${page}`
		: `/api/users?limit=${limit}&page=${page}&${search}`;
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
