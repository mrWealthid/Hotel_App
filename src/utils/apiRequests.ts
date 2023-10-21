import { headers } from 'next/headers';

export async function getData(url: any, tag?: any) {
	const host = headers().get('host');
	const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
	try {
		console.log(url);
		const res = await fetch(`${protocol}://${host}/${url}`, {
			next: { tags: [tag] }
		});
		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		return await res.json();
	} catch (err) {
		console.log(err);
	}
}

export async function findData(url: any, id: any, revalidate = 0) {
	const host = headers().get('host');
	const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
	try {
		const res = await fetch(`${protocol}://${host}/${url}/${id}`);
		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		return await res.json();
	} catch (err) {
		console.log(err);
	}
}
// Example POST method implementation:
export async function createData(url = '', data = {}) {
	try {
		const res = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
		return res.json(); // parses JSON response into native JavaScript objects
	} catch (err) {
		console.log(err);
	}
}
export async function updateData(url: any, data: any) {
	try {
		const res = await fetch(`${url}/${data.id}`, {
			method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
		return res.json(); // parses JSON response into native JavaScript objects
	} catch (err) {
		console.log(err);
	}
}
export async function deleteData(url = '') {
	try {
		const res = await fetch(url, {
			method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
		return res.json(); // parses JSON response into native JavaScript objects
	} catch (err) {
		console.log(err);
	}
}
