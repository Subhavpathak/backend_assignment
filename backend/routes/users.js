const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// List users - admin only
router.get('/', authenticate, requireRole('admin'), async (req,res)=>{
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;
