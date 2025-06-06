export interface Guest {
  id: string;
  name: string;
  email: string;
  nationalId: string;
  nationality: string;
  countryFlag?: string;
  createdAt: string;
  _id?: string; // MongoDB ObjectId
}
export type GuestPayload = Omit<Guest, "_id" | "id" | "createdAt">;

export type GuestQueryprops = {
  handleFilter?: (
    query: { discount?: string | number; sort?: string } | null
  ) => void;
};

export type GuestFilterQuery = {
  discount?: string | number;
  sort?: string;
};

export type GuestRowProps = {
  data?: Guest[];
};
export type GuestRowActionProps = {
  guest?: Guest;
};

export type GuestFormProps = {
  guest?: Guest;
  onCloseModal?: () => void;
};

export interface IGuestForm {
  name: string;
  email: string;
  nationalId: string;
  nationality: string;
}
