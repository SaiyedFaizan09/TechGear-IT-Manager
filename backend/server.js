// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Added to read the .env file

const app = express();
app.use(express.json());

// Connect to Database using the .env variable
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techgear')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));

// ==========================================
// MODULE INTEGRATION (The Final Wiring)
// ==========================================

// Developer A's Module (Identity)
app.use('/api/auth', require('./routes/auth'));

// Developer B's Module (Inventory)
app.use('/api/inventory', require('./routes/inventory'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));