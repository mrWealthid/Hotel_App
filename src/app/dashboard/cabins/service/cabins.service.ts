import axios from "axios";
import { Cabin } from "../model/cabin.model";

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
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Cabins could not be loaded Status: ${err.response.status}`
      );
    }
    throw new Error("Cabins could not be loaded");
  }
}

export async function handleCreateCabin(
  data: Partial<Cabin>,
  isEditing: boolean,
  cabinId?: string
) {
  try {
    const res = isEditing
      ? await axios.patch(`/api/cabins/${cabinId}`, data)
      : await axios.post(`/api/cabins`, data);

    const resData = await res.data;
    return resData;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Cabins could not be created Status: ${err.response.status}`
      );
    }
    throw new Error("Cabins could not be created");
  }
}
export async function handleDelete(id: string) {
  try {
    const response = await axios.delete(`/api/cabins/${id}`);

    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Cabins could not be deleted Status: ${err.response.status}`
      );
    }
    throw new Error("Cabins could not be deleted");
  }
}

export async function handleDuplicateCabin(rowData: Partial<Cabin>) {
  const { _id, id, ...rest } = rowData;

  try {
    const response = await axios.post(`/api/cabins`, rest);
    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Cabins could not be duplicated Status: ${err.response.status}`
      );
    }
    throw new Error("Cabins could not be duplicated");
  }
}
