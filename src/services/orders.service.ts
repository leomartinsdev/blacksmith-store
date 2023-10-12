import db from '../database/models';
import ProductModel from '../database/models/product.model';
import OrderModel from '../database/models/order.model';

import { Order, CreateOrder } from '../types/Order';
import { ServiceResponse, ServiceResponseError } from '../types/ServiceResponse';
import validateOrder from '../middlewares/order.middleware';

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
    const productIds = order.productIds?.map((productId) => { // Aqui, cada elemento é um productId.
      const productIdsArr = typeof productId === 'object' ? productId.id : productId;
      return productIdsArr;
    });
    return { ...order, productIds };
  });
  return { status: 'SUCCESSFUL', data: ordersArr };
}

const verifyId = async (productIds: number[]): Promise<ServiceResponseError | undefined> => {
  const promises = productIds
    .map((productId) => ProductModel.findByPk(productId));
  const results = await Promise.all(promises);
  const foundProducts = results.every((result) => result);
  if (!foundProducts) {
    return { status: 'NOT_FOUND', data: { message: 'Some product not found' } };
  }
};

async function create(order: CreateOrder): Promise<ServiceResponse<CreateOrder>> {
  const error = validateOrder(order);
  if (error) return error;

  const { productIds, userId } = order;
  const foundUser = await OrderModel.findOne({ where: { id: userId } });
  
  if (!foundUser) return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };

  const verifyIdError = await verifyId(productIds);
  if (verifyIdError) return verifyIdError;

  const result = await db.transaction(async (transaction) => {
    const newOrder = await OrderModel.create({ userId }, { transaction });
    const updatePromises = productIds.map((productId) => ProductModel.update(
      { orderId: newOrder.dataValues.id }, 
      { where: { id: productId }, transaction },
    ));
    await Promise.all(updatePromises);
    return { userId, productIds };
  });

  return { status: 'CREATED', data: result };
}

export default {
  findAll,
  create,
};