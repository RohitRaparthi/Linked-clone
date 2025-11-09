import { Router } from 'express';
import Post from '../models/Post.js';
import { auth } from '../middleware/auth.js';


const router = Router();


// Create post
router.post('/', auth, async (req, res) => {
try {
const { text, imageUrl } = req.body;
if (!text || !text.trim()) return res.status(400).json({ message: 'Text is required' });
const post = await Post.create({ author: req.user.id, text: text.trim(), imageUrl });
const populated = await post.populate('author', 'name email').populate('comments.user', 'name email');;
res.status(201).json(populated);
} catch (e) {
console.error(e);
res.status(500).json({ message: 'Server error' });
}
});

// Get all posts (newest first)
router.get('/', async (_req, res) => {
try {
const posts = await Post.find({})
.populate('author', 'name email')
.populate('comments.user', 'name email')
.sort({ createdAt: -1 });
res.json(posts);
} catch (e) {
console.error(e);
res.status(500).json({ message: 'Server error' });
}
});


// Optional: like/unlike
router.post('/:id/like', auth, async (req, res) => {
try {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ message: 'Not found' });
const i = post.likes.findIndex((u) => String(u) === req.user.id);
if (i === -1) post.likes.push(req.user.id);
else post.likes.splice(i, 1);
await post.save();
const populated = await Post.findById(post._id).populate('author', 'name email').populate('comments.user', 'name email');
res.json(populated);
} catch (e) {
console.error(e);
res.status(500).json({ message: 'Server error' });
}
});

// Optional: comment
router.post('/:id/comment', auth, async (req, res) => {
try {
const { text } = req.body;
if (!text) return res.status(400).json({ message: 'Text is required' });
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ message: 'Not found' });
post.comments.push({ user: req.user.id, text });
await post.save();
const populated = await Post.findById(post._id).populate('author', 'name email').populate('comments.user', 'name email');
res.json(populated);
} catch (e) {
console.error(e);
res.status(500).json({ message: 'Server error' });
}
});


// Edit own post
router.put('/:id', auth, async (req, res) => {
try {
const { text, imageUrl } = req.body;
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ message: 'Not found' });
if (String(post.author) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
if (text !== undefined) post.text = text;
if (imageUrl !== undefined) post.imageUrl = imageUrl;
await post.save();
const populated = await Post.findById(post._id).populate('author', 'name email').populate('comments.user', 'name email');;
res.json(populated);
} catch (e) {
console.error(e);
res.status(500).json({ message: 'Server error' });
}
});

// Delete own post
router.delete('/:id', auth, async (req, res) => {
try {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ message: 'Not found' });
if (String(post.author) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
await post.deleteOne();
res.json({ success: true });
} catch (e) {
console.error(e);
res.status(500).json({ message: 'Server error' });
}
});


export default router;