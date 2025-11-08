import express from 'express';
import { authenticate } from '../middleware/auth';
import { getPayments, createPayment } from '../controllers/paymentController';

const router = express.Router();

router.use(authenticate);

router.get('/', getPayments);
router.post('/', createPayment);

export default router;
