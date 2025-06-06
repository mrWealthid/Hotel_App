export interface ApiError {
  message: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface ITab {
  title: string;
  order: number;
  icon: React.ReactNode;
}
