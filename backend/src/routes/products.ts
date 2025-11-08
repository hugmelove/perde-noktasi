import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { 
  getTulleTypes, 
  getFoldTypes, 
  getSunshadeTypes,
  createTulleType,
  createFoldType,
  createSunshadeType
} from '../controllers/productController';
import { UserRole } from '../types';

const router = express.Router();

router.use(authenticate);

router.get('/tulle', getTulleTypes);
router.get('/fold', getFoldTypes);
router.get('/sunshade', getSunshadeTypes);

router.post('/tulle', authorize(UserRole.ADMIN), createTulleType);
router.post('/fold', authorize(UserRole.ADMIN), createFoldType);
router.post('/sunshade', authorize(UserRole.ADMIN), createSunshadeType);

export default router;
