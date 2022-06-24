import express from "express";
const router = express();
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts } from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.get('/top', getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/').post(protect, admin, createProduct)
router.route('/:id').get(getProductById)
router.route('/:id').delete(protect, admin, deleteProduct)
router.route('/:id').put(protect, admin, updateProduct)





export default router;