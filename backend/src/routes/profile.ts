import express from 'express';
import { supabase } from '../lib/supabase.js';
import { authMiddleware } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
});

// Update user profile
router.put('/profile', authMiddleware, async (req: AuthRequest, res) => {
  const user = req.user;
  const { first_name, last_name, email, contact_no, department, cgpa } = req.body;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ first_name, last_name, email, contact_no, department, cgpa })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
});

export default router;
