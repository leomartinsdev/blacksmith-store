import ProductModel, {
  ProductInputtableTypes,
} from '../database/models/product.model';

import { Product, ProductNoId } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse'; 

async function create(product: ProductInputtableTypes):
Promise<ServiceResponse<Product | ProductNoId>> {
  const newProduct = await ProductModel.create(product);
  const productInfo = newProduct.toJSON();

  const { orderId, ...productNoId } = productInfo;
  
  return { status: 'CREATED', data: productNoId };
}

export default {
  create,
};