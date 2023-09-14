import ProductModel, {
  ProductInputtableTypes,
} from '../database/models/product.model';

import { Product, ProductNoId } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function findAll(): Promise<ServiceResponse<Product[]>> {
  const products = await ProductModel.findAll();
  const productsJson = products.map((product) => product.toJSON());
  return { status: 'SUCCESSFUL', data: productsJson };
}

async function create(product: ProductInputtableTypes):
Promise<ServiceResponse<Product | ProductNoId>> {
  const newProduct = await ProductModel.create(product);
  const productInfo = newProduct.toJSON();

  const { orderId, ...productNoId } = productInfo;
  
  return { status: 'CREATED', data: productNoId };
}

export default {
  create,
  findAll,
};