import axios from "axios";
import { Booking, CheckOutPayload } from "../model/booking.model";

export async function fetchBookings(
  page: number,
  limit: number,
  query: string | null
) {
  const url = query
    ? `/api/bookings?limit=${limit}&page=${page}&${query}`
    : `/api/bookings?limit=${limit}&page=${page}`;
  try {
    const response = await axios(url);

    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Bookings could not be loaded Status: ${err.response.status}`
      );
    }
    throw new Error("Bookings could not be loaded");
  }
}

export async function fetchGuests(query: string | null) {
  const url = query
    ? `/api/guests/searchterm?name=${query}`
    : `/api/guests/searchterm`;
  try {
    const response = await axios(url);

    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Guest could not be loaded Status: ${err.response.status}`
      );
    }
    throw new Error(`Guest could not be loaded`);
  }
}
export async function fetchCabins(query: string | null) {
  const url = query
    ? `/api/cabins/searchterm?name=${query}`
    : `/api/cabins/searchterm`;
  try {
    const response = await axios(url);

    const data = await response.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Cabin could not be loaded Status: ${err.response.status}`
      );
    }
    throw new Error(`Cabin could not be loaded`);
  }
}

export async function handleCreateBooking(
  data: any,
  booking: any,
  isEditing: any
) {
  try {
    const res = isEditing
      ? await axios.patch(`/api/bookings/${booking.id}`, data)
      : await axios.post(`/api/bookings`, data);

    const resData = await res.data;
    return resData;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Bookings could not be loaded Status: ${err.response.status}`
      );
    }
    throw new Error(`Bookings could not be loaded`);
  }
}

export async function handleDeleteBookings(id: string) {
  try {
    const res = await axios.delete(`/api/bookings/${id}`);

    const data = await res.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Booking could not be deleted Status: ${err.response.status}`
      );
    }
    throw new Error(`Booking could not be deleted`);
  }
}

export async function handleCheckout(payload: CheckOutPayload, id: string) {
  try {
    const res = await axios.patch(`/api/bookings/${id}`, payload);

    const data = await res.data;
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Guest could not be checked out Status: ${err.response.status}`
      );
    }
    throw new Error(`Guest could not be checked out`);
  }
}
