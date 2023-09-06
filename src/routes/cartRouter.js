import { Router } from "express";
import { 
    getAllController,
    getByIDController,
    createCartController,
    addToCartController,
    deleteFromCartController,
    updateProdQuantityController
} from '../controllers/carts.controllers.js'
import { checkAuth } from '../jwt/auth.js'

const router = Router();

router.get('/', getAllController);
router.get('/:id', getByIDController);
router.post('/', createCartController);
router.put('/:cid/product/:pid', checkAuth, addToCartController);
router.delete('/:cid/products/:pid', deleteFromCartController);
router.put('/:cid/quantity/:pid', updateProdQuantityController);

export default router;