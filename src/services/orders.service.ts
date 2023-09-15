import ProductModel from '../database/models/product.model';
import OrderModel from '../database/models/order.model';

import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

async function findAll(): Promise<ServiceResponse<Order[]>> {
  const orders = await OrderModel.findAll({
    include: {
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    },
  });

  const ordersJSON = orders.map((order) => order.toJSON()); // Isso me gera um array com todas as ordens.

  const ordersArr = ordersJSON.map((order) => { // Aqui, cada order é um elemento com suas próprias propriedades.
    console.log('---> ORDER:', order);
    const productIds = order.productIds?.map((productId) => { // Aqui, cada elemento é um productId.
      const productIdsArr = typeof productId === 'object' ? productId.id : productId;
      return productIdsArr;
    });
    return { ...order, productIds };
  });
  return { status: 'SUCCESSFUL', data: ordersArr };
}

export default {
  findAll,
};