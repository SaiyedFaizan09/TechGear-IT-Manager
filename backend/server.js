// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Import CORS
require('dotenv').config(); 

const app = express();

// Replace app.use(cors()); with:
app.use(cors({
    origin: '*' // In a real app, you would put your Vercel domain here
}));
app.use(express.json());

// Connect to Database
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techgear')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));

// Developer A's Module (Identity)
app.use('/api/auth', require('./routes/auth'));

// Developer B's Module (Inventory)
app.use('/api/inventory', require('./routes/inventory'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));