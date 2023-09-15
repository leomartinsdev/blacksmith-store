import express from 'express';
import productsRouter from './routers/productRouter';
import ordersRouter from './routers/ordersRouter';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;
