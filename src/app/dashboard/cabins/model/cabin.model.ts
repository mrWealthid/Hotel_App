export interface Cabin {
  id?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description?: string;
  image?: string;
  createdAt?: Date | string;
}

export type CabinPayload = Omit<Cabin, "_id" | "createdAt">;
