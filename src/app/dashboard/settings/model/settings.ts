export interface Setting {
  id: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
  createdAt?: Date | string;
}
export type SettingPayload = Omit<Setting, "id" | "createdAt">;

export type SettingsProps = {
  settings: Setting;
};
