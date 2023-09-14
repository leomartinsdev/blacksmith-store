import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function findAll(_req: Request, res: Response) {
  const serviceResponse = await productsService.findAll();

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

async function create(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productsService.create({ name, price, orderId });

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  create,
  findAll,
};