import { Cabin } from "../../cabins/model/cabin.model";
import { Guest } from "../../guests/model/guest.model";
import { Setting } from "../../settings/model/settings";

export interface Booking {
  id: string;
  startDate: Date | string;
  endDate: Date | string;
  numNights?: number;
  numGuests: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice?: number;
  checkStatus?: CheckStatus;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string;
  guests: Guest;
  cabin: Cabin;
  createdAt: Date | string;
}

export enum CheckStatus {
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  UNCONFIRMED = "UNCONFIRMED",
}

export interface BookingPayload
  extends Omit<Booking, "id" | "createdAt" | "guests" | "cabin"> {
  guests: string; // Guest ObjectId as string
  cabin: string; // Cabin ObjectId as string
}

export type CheckOutPayload = Pick<Booking, "checkStatus">;

export type ViewBookingProps = {
  params: {
    bookingId: string;
  };
};

export type BookingRowActionsProps = {
  booking?: Booking;
};
export type AddBookingProps = {
  settings: Setting;
};

export type BookingFormProps = {
  settings: Setting;
  booking?: Booking;
  onCloseModal?: () => void;
};

export interface IBookingForm {
  startDate: Date | string;
  endDate: Date | string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  totalPrice: number;
  observations: string;
  guests: string; // Guest ObjectId as string
  cabin: string; // Cabin ObjectId as string
}

export type BookingQueryprops = {
  handleFilter?: (query: { checkStatus?: string } | null) => void;
};

export type BookingFilterQuery = {
  checkStatus?: string;
};

export type BookingRowProps = {
  data?: Booking[];
};
