import { Router } from 'express';
import { createProduct, getProducts, getProductBySlug, deleteProduct } from '../controllers/productController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

// Admin only routes
router.use(protect, restrictTo('ADMIN'));
router.post('/', upload.array('images', 5), createProduct);
router.delete('/:id', deleteProduct);

export default router;
