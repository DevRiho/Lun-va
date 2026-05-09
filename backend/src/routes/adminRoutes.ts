import { Router } from 'express';
import { getDashboardAnalytics, getAllUsers } from '../controllers/adminController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect, restrictTo('ADMIN'));

router.get('/analytics', getDashboardAnalytics);
router.get('/users', getAllUsers);

export default router;
