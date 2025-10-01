const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticate } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Create task
router.post('/', authenticate, [
  body('title').notEmpty().withMessage('Title required')
], async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try{
    const t = new Task({ title: req.body.title, description: req.body.description||'', owner: req.user._id });
    await t.save();
    res.status(201).json(t);
  }catch(err){ res.status(500).json({ message: 'Server error' }); }
});

// Get user's tasks (or all if admin)
router.get('/', authenticate, async (req,res)=>{
  try{
    let tasks;
    if(req.user.role === 'admin') tasks = await Task.find().populate('owner','name email');
    else tasks = await Task.find({ owner: req.user._id }).populate('owner','name email');
    res.json(tasks);
  }catch(err){ res.status(500).json({ message: 'Server error' }); }
});

// Get single
router.get('/:id', authenticate, async (req,res)=>{
  try{
    const t = await Task.findById(req.params.id);
    if(!t) return res.status(404).json({ message: 'Not found' });
    if(req.user.role !== 'admin' && t.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    res.json(t);
  }catch(err){ res.status(500).json({ message: 'Server error' }); }
});

// Update
router.put('/:id', authenticate, async (req,res)=>{
  try{
    const t = await Task.findById(req.params.id);
    if(!t) return res.status(404).json({ message: 'Not found' });
    if(req.user.role !== 'admin' && t.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    t.title = req.body.title || t.title;
    t.description = req.body.description || t.description;
    if(typeof req.body.completed === 'boolean') t.completed = req.body.completed;
    await t.save();
    res.json(t);
  }catch(err){ res.status(500).json({ message: 'Server error' }); }
});

// Delete
router.delete('/:id', authenticate, async (req,res)=>{
  try{
    const t = await Task.findById(req.params.id);
    if(!t) return res.status(404).json({ message: 'Not found' });
    if(req.user.role !== 'admin' && t.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await t.deleteOne();
    res.json({ message: 'Deleted' });
  }catch(err){ res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
