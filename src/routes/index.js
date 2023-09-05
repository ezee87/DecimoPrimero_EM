import { Router } from 'express';
const router = Router();

import productsRouter from './productsRouter.js';
import usersRouter from './users.router.js';
import cartsRouter from './cartRouter.js';
import viewsRouter from './viewsRouter.js';
import productFakerRouter from './productRouterFake.js'

router.use('/', viewsRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/carts', cartsRouter);
router.use('/productsFake', productFakerRouter);

export default router;