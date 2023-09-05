import { Router } from "express";
import { 
    getAllController,
    getByIDController,
    createCartController,
    addToCartController,
    deleteFromCartController,
    updateProdQuantityController
} from '../controllers/carts.controllers.js'
import { isUser } from '../middlewares/authorization.js'
import { checkAuth } from '../jwt/auth.js'
import TicketController from "../controllers/ticket.controllers.js";

const router = Router();

router.get('/', getAllController);
router.get('/:id', getByIDController);
router.post('/', createCartController);
router.put('/:cid/product/:pid', checkAuth, isUser, addToCartController);
router.delete('/:cid/products/:pid', deleteFromCartController);
router.put('/:cid/quantity/:pid', updateProdQuantityController);
/* router.post("/:cid/purchase" , TicketController.generateTicket) */

export default router;