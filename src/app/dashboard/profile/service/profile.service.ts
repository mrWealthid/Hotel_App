export async function fetchProfile() {
	const url = `http://localhost:3000/api/users/me`;
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
