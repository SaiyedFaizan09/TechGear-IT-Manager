// backend/models/Inventory.js
const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    totalStock: { type: Number, required: true },
    availableStock: { type: Number, required: true }
});

module.exports = mongoose.model('Inventory', InventorySchema);