import { Request, Response } from 'express';
import ordersService from '../services/orders.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function findAll(_req: Request, res: Response) {
  const serviceResponse = await ordersService.findAll();

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

async function create(req: Request, res: Response) {
  const { productIds, userId } = req.body;

  const serviceResponse = await ordersService.create({ productIds, userId });

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  findAll,
  create,
};