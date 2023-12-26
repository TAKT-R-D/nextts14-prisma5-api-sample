const error400 = {
  message: 'Bad Request',
};
const error401 = {
  message: 'Unauthorized',
};
const error404 = {
  message: 'Not Found',
};
const error406 = {
  message: 'Unauthorized',
};
const error500 = {
  message: 'Internal Server Error',
};

export const ERROR_MAP: { [key: number]: { message: string } } = {
  400: error400,
  401: error401,
  404: error404,
  406: error406,
  500: error500,
};
