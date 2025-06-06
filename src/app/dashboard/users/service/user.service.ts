import axios from "axios";

export async function fetchUsers(
  page: number,
  limit: number,
  search: string | null
) {
  const url = !search
    ? `/api/users?limit=${limit}&page=${page}`
    : `/api/users?limit=${limit}&page=${page}&${search}`;
  try {
    const response = await axios(url);

    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Users could not be loaded Status: ${err.response.status}`
      );
    }
    throw new Error("Users could not be loaded");
  }
}
