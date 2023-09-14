import { Router } from 'express';
import productsController from '../controllers/products.controller';

const productsRouter = Router();

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.findAll);

export default productsRouter;