import express from 'express';
import productsRouter from './routers/productRouter';
import ordersRouter from './routers/ordersRouter';
import loginRouter from './routers/loginRouter';

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;
