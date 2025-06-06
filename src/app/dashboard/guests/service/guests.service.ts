import axios from "axios";

export async function fetchGuests(
  page: number,
  limit: number,
  query: string | null
) {
  const url = query
    ? `/api/guests?limit=${limit}&page=${page}&${query}`
    : `/api/guests?limit=${limit}&page=${page}`;
  try {
    const response = await axios(url);

    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Guests could not be loaded Status: ${err.response.status}`
      );
    }
    throw new Error("Guests could not be loaded");
  }
}
export async function fetchGuest(query: string | null) {
  const url = query
    ? `/api/guests/searchterm?name=${query}`
    : `/api/guests/searchterm`;
  try {
    const response = await axios(url);

    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(`Guest could not be loaded: ${err.response.status}`);
    }
    throw new Error("Guest could not be loaded");
  }
}
// export async function fetchCabins(query: string | null) {
// 	const url = query
// 		? `/api/cabins/searchterm?name=${query}`
// 		: `/api/cabins/searchterm`;
// 	try {
// 		const response = await axios(url);

// 		const data = await response.data;
// 		return data;
// 	} catch (err: any) {
// 		throw new Error(`Cabins could not loaded: ${err.response.status}`);
// 	}
// }

export async function handleCreateGuest(
  data: any,
  guestId: any,
  isEditing: any
) {
  try {
    const res = isEditing
      ? await axios.patch(`/api/guests/${guestId}`, data)
      : await axios.post(`/api/guests`, data);

    const resData = await res.data;
    return resData;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Guest could not be created Status: ${err.response.status}`
      );
    }
    throw new Error("Guest could not be created");
  }
}

export async function handleDeleteGuests(id: any) {
  try {
    const res = await axios.delete(`/api/guests/${id}`);

    const data = await res.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Guest could not be deleted Status: ${err.response.status}`
      );
    }
    throw new Error("Guest could not be deleted");
  }
}

export async function handleCheckout(payload: any, id: any) {
  try {
    const res = await axios.patch(`/api/guests/${id}`, payload);

    const data = await res.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Guest could not be checked out Status: ${err.response.status}`
      );
    }
    throw new Error("Guest could not be checked out");
  }
}
