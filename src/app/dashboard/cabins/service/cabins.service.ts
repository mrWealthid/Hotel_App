import axios from 'axios';

export async function fetchCabins(
	page: number,
	limit: number,
	search?: string | null
) {
	const url = !search
		? `/api/cabins?limit=${limit}&page=${page}`
		: `/api/cabins?limit=${limit}&page=${page}&${search}`;
	try {
		const response = await axios(url);

		const data = await response.data;
		return data;
	} catch (err: any) {
		console.log(err);
		throw new Error(
			`Cabins could not be loaded Status: ${err.response.status}`
		);
	}
}

export async function handleCreateCabin(data: any, cabin: any, isEditing: any) {
	try {
		const res = isEditing
			? await axios.patch(`/api/cabins/${cabin?.id}`, data)
			: await axios.post(`api/cabinsa`, data);

		const resData = await res.data;
		return resData;
	} catch (err: any) {
		console.log(err);
		throw new Error(
			`Cabin could not be created Status: ${err.response.status}`
		);
	}
}
export async function handleDelete(id: any) {
	try {
		const response = await axios.delete(`/api/cabins/${id}`);

		const data = await response.data;
		return data;
	} catch (err: any) {
		console.log(err);
		throw new Error(
			`Cabin could not be deleted Status: ${err.response.status}`
		);
	}
}

export async function handleDuplicateCabin(rowData: any) {
	const { _id, id, ...rest } = rowData;

	try {
		const response = await axios.post(`/api/cabins`, rest);
		const data = await response.data;
		return data;
	} catch (err: any) {
		console.log(err);
		throw new Error(
			`Booking could not be created Status: ${err.response.status}`
		);
	}
}
