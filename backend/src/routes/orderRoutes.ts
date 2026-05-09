import { Router } from 'express';
import { createCheckoutSession, getUserOrders } from '../controllers/orderController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect);

router.post('/checkout-session', createCheckoutSession);
router.get('/my-orders', getUserOrders);

export default router;
