import express from 'express';
import { supabase } from '../lib/supabase.js';
import { authMiddleware } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Create a new post
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
	const user = req.user;
	const { title, description, purpose, skill_requirements, deadline, max_members } = req.body;

	if (!user) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const { data, error } = await supabase
		.from('posts')
		.insert([{ author_id: user.id, title, description, purpose, skill_requirements, deadline, max_members }])
		.select();

	if (error) {
		return res.status(400).json({ error: error.message });
	}

	return res.status(201).json(data);
});

// Get all posts (or apply filters)
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
	const user = req.user;

	if (!user) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('author_id', user.id);

	if (error) {
		return res.status(400).json({ error: error.message });
	}

	return res.status(200).json(data);
});

// Get post details
router.get('/:id', authMiddleware, async (req: AuthRequest, res) => {
	const { id } = req.params;

	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		return res.status(400).json({ error: error.message });
	}

	return res.status(200).json(data);
});

// Update post
router.put('/:id', authMiddleware, async (req: AuthRequest, res) => {
	const { id } = req.params;
	const { title, description, purpose, skill_requirements, deadline, max_members } = req.body;

	const { data, error } = await supabase
		.from('posts')
		.update({ title, description, purpose, skill_requirements, deadline, max_members })
		.eq('id', id)
		.select();

	if (error) {
		return res.status(400).json({ error: error.message });
	}

	return res.status(200).json(data);
});

// Delete post
router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
	const { id } = req.params;

	const { error } = await supabase
		.from('posts')
		.delete()
		.eq('id', id);

	if (error) {
		return res.status(400).json({ error: error.message });
	}

	return res.status(200).json({ message: 'Post deleted successfully' });
});

export default router;
