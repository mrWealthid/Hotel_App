import axios from "axios";

export async function fetchProfile() {
  const url = `/api/users/me`;
  try {
    const response = await axios(url);

    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Profile could not be loaded Status: ${err.response.status}`
      );
    }
    throw new Error("Profile could not be loaded");
  }
}
