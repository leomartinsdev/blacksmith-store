import { Router } from 'express';
import ordersController from '../controllers/orders.controller';
import verifyToken from '../auth/verifyToken';

const ordersRouter = Router();

ordersRouter.get('/', ordersController.findAll);
ordersRouter.post('/', verifyToken, ordersController.create);

export default ordersRouter;