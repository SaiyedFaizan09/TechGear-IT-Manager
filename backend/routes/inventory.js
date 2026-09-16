// backend/routes/inventory.js
const express = require('express');
const Inventory = require('../models/Inventory');
const router = express.Router();

// ADD NEW INVENTORY (Admin only in real scenario)
router.post('/add', async (req, res) => {
    try {
        const { itemName, category, totalStock } = req.body;
        const newItem = new Inventory({ 
            itemName, 
            category, 
            totalStock, 
            availableStock: totalStock // Initially, available matches total
        });
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// GET ALL INVENTORY
router.get('/all', async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
});

module.exports = router;