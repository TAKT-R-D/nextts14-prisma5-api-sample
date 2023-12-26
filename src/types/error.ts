export type ErrorType = {
  message: string;
  errors?: {
    path: string;
    message: string;
  }[];
};
