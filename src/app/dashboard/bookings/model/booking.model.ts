export interface Booking {
  id: string;
  startDate: Date | string;
  endDate: Date | string;
  numNights?: number;
  numGuests: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice?: number;
  checkStatus?:
    | CheckStatus.CHECKED_IN
    | CheckStatus.UNCONFIRMED
    | CheckStatus.CHECKED_OUT;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string;
  guests: string; // Guest _id as string
  cabin: string; // Cabin _id as string
  createdAt: Date | string;
}

export enum CheckStatus {
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  UNCONFIRMED = "UNCONFIRMED",
}

export type BookingPayload = Omit<Booking, "id" | "createdAt">;
