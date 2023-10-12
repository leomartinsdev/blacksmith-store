type ServiceResponseErrorType = 'INVALID_VALUE' | 'UNAUTHORIZED' | 'NOT_FOUND'
| 'CONFLICT' | 'BAD_REQUEST';

export type ServiceResponseError = {
  status: ServiceResponseErrorType, 
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED', 
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;