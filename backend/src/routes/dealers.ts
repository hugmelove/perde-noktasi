import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getDealers, createDealer, updateDealer, deleteDealer } from '../controllers/dealerController';
import { UserRole } from '../types';

const router = express.Router();

router.use(authenticate);
router.use(authorize(UserRole.ADMIN));

router.get('/', getDealers);
router.post('/', createDealer);
router.put('/:id', updateDealer);
router.delete('/:id', deleteDealer);

export default router;
