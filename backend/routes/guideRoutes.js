const express = require('express');
const router = express.Router();
const Guide = require('../models/guideModel');

// CREATE a new guide
router.post('/', async (req, res) => {
    try {
        const guide = new Guide(req.body);
        await guide.save();
        res.status(201).json(guide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all guides
router.get('/', async (req, res) => {
    try {
        const guides = await Guide.find();
        res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single guide by ID
router.get('/:id', async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ message: 'Guide not found' });
        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a guide
router.put('/:id', async (req, res) => {
    try {
        const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!guide) return res.status(404).json({ message: 'Guide not found' });
        res.status(200).json(guide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a guide
router.delete('/:id', async (req, res) => {
    try {
        const guide = await Guide.findByIdAndDelete(req.params.id);
        if (!guide) return res.status(404).json({ message: 'Guide not found' });
        res.status(200).json({ message: 'Guide deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
