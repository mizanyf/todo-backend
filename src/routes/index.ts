import { Router } from 'express';
import authRoutes from './authRoutes';
import todoRoutes from './todoRoutes';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Route untuk autentikasi (register & login)
router.use('/auth', authRoutes);

// Route untuk todos, hanya bisa diakses jika sudah login (token valid)
router.use('/todos', verifyToken, todoRoutes);

export default router;
