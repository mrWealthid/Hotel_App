export interface Cabin {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description?: string;
  image?: string;
  createdAt?: Date | string;
  _id?: string; // MongoDB ObjectId
  // Indicates if the cabin is active or not
}

export type CabinRowActionsProps = { cabin?: Cabin };
export type CabinFormProps = {
  cabin?: Cabin;
  onCloseModal?: () => void;
};

export type CabinPayload = Omit<Cabin, "_id" | "id" | "createdAt">;

export type CabinQueryprops = {
  handleFilter?: (
    query: { discount?: string | number; sort?: string } | null
  ) => void;
};

export type CabinFilterQuery = {
  discount?: string | number;
  sort?: string;
};
