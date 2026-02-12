import { Router } from 'express';
import authRoutes from './auth.js';
import profileRoutes from './profile.js';
import postRoutes from './posts.js';
import invitationRoutes from './invitations.js';

const router = Router();

/**
 * API Routes
 * Base: /api/v1
 */

// Auth routes
router.use('/auth', authRoutes);

// Profile routes (matches frontend /users/profile)
router.use('/users', profileRoutes);

// Posts routes
router.use('/posts', postRoutes);

// Invitation routes
router.use('/invitations', invitationRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
