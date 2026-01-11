const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const JWT_SECRET = 'very_secret_key_change_later';

// simple auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// GET /api/profile  -> get user with caregivers
router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    language: user.language,
    caregivers: user.caregivers,
  });
});

// PUT /api/profile/caregivers  -> replace caregivers array
router.put('/profile/caregivers', authMiddleware, async (req, res) => {
  const { caregivers } = req.body; // array from frontend

  const user = await User.findByIdAndUpdate(
    req.userId,
    { caregivers },
    { new: true }
  );

  res.json({
    id: user._id,
    caregivers: user.caregivers,
  });
});

module.exports = router;
