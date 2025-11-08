import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getOrders, createOrder, updateOrderStatus } from '../controllers/orderController';
import { UserRole } from '../types';

const router = express.Router();

router.use(authenticate);

router.get('/', getOrders);
router.post('/', createOrder);
router.patch('/:id/status', authorize(UserRole.ADMIN), updateOrderStatus);

export default router;
