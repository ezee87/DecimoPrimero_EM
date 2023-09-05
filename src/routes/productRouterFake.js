import {
    createController,
    getController
} from '../controllers/productsFaker.controllers.js';
import { Router } from 'express';

const router = Router();

router.post('/create', createController);
router.get('/', getController)

export default router;