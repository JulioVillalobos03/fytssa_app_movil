export type ApiSuccess<T> = {
  success: true;
  code: string;
  data: T;
};

export type ApiError = {
  success: false;
  code: string;
  errors?: any;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;