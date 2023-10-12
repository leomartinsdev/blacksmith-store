import { CreateOrder } from '../types/Order';
import { ServiceResponseError } from '../types/ServiceResponse';
import { addOrderSchema } from './schemas';

const validateOrder = (product: CreateOrder): ServiceResponseError | undefined => {
  const { error } = addOrderSchema.validate(product);
  if (error) {
    if (error.message.includes('is required')) {
      return { status: 'BAD_REQUEST', data: { message: error.message } };
    }
    return { status: 'CONFLICT', data: { message: error.message } };
  }
};

export default validateOrder;
