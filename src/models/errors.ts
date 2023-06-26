export type ErrorsType = {
  string: {
    required_error: string;
    invalid_type_error: string;
  },
  number: {
    required_error: string;
    invalid_type_error: string;
  },
  nonnegative: {
    message: string;
  },
  url: {
    message: string;
  },
};
